#!/usr/bin/env python3
"""Safely copy or move one file and write its archive metadata sidecar."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import sys
import tempfile
from datetime import datetime


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("destination_dir", type=Path)
    parser.add_argument("--archive-root", type=Path, required=True)
    parser.add_argument("--summary", required=True)
    parser.add_argument("--tag", action="append", dest="tags", required=True)
    parser.add_argument("--mode", choices=("copy", "move"), default="copy")
    parser.add_argument("--create-destination", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--timestamp",
        help="Explicit timezone-aware ISO 8601 timestamp for reproducible tests.",
    )
    return parser.parse_args()


def fail(message: str) -> "NoReturn":
    raise ValueError(message)


def within(path: Path, root: Path) -> bool:
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def yaml_string(value: str) -> str:
    # JSON strings are valid YAML scalars and avoid a PyYAML dependency.
    return json.dumps(value, ensure_ascii=False)


def render_metadata(metadata: dict[str, object]) -> str:
    source = metadata["source"]
    destination = metadata["destination"]
    assert isinstance(source, dict) and isinstance(destination, dict)
    lines = [
        f"schema_version: {metadata['schema_version']}",
        f"archived_at: {yaml_string(str(metadata['archived_at']))}",
        f"summary: {yaml_string(str(metadata['summary']))}",
        "tags:",
    ]
    lines.extend(f"  - {yaml_string(str(tag))}" for tag in metadata["tags"])
    lines.extend(
        [
            "source:",
            f"  original_path: {yaml_string(str(source['original_path']))}",
            f"  sha256: {yaml_string(str(source['sha256']))}",
            "destination:",
            f"  relative_path: {yaml_string(str(destination['relative_path']))}",
            f"  primary_category: {yaml_string(str(destination['primary_category']))}",
            f"operation: {yaml_string(str(metadata['operation']))}",
        ]
    )
    return "\n".join(lines) + "\n"


def normalized_timestamp(raw: str | None) -> str:
    if raw is None:
        return datetime.now().astimezone().isoformat(timespec="seconds")
    parsed = datetime.fromisoformat(raw)
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        fail("--timestamp must include an explicit UTC offset")
    return parsed.isoformat(timespec="seconds")


def publish_exclusive(temporary: Path, destination: Path) -> None:
    """Publish without replacing a file created after the preflight check."""
    os.link(temporary, destination)
    temporary.unlink()


def main() -> int:
    args = parse_args()
    source = args.source.expanduser()
    if source.is_symlink():
        fail("source symlinks are not archived")
    source = source.resolve(strict=True)
    if not source.is_file():
        fail("source must be one regular file")

    archive_root = args.archive_root.expanduser().resolve(strict=True)
    destination_dir_input = args.destination_dir.expanduser()
    if args.create_destination:
        destination_dir = destination_dir_input.resolve(strict=False)
    else:
        destination_dir = destination_dir_input.resolve(strict=True)
    if not within(destination_dir, archive_root):
        fail("destination directory must stay within --archive-root")
    if destination_dir.exists() and not destination_dir.is_dir():
        fail("destination must be a directory")
    if not destination_dir.exists() and not args.create_destination:
        fail("destination directory does not exist")

    summary = args.summary.strip()
    if not summary:
        fail("summary must not be blank")
    tags = list(dict.fromkeys(tag.strip() for tag in args.tags if tag.strip()))
    if not tags:
        fail("at least one non-blank tag is required")

    destination = destination_dir / source.name
    sidecar = destination.with_name(destination.name + ".metadata.yaml")
    if destination.exists() or sidecar.exists():
        fail("destination file or metadata sidecar already exists")
    if source == destination:
        fail("source and destination must differ")

    file_hash = sha256(source)
    category = os.path.relpath(destination_dir, archive_root)
    metadata = {
        "schema_version": 1,
        "archived_at": normalized_timestamp(args.timestamp),
        "summary": summary,
        "tags": tags,
        "source": {"original_path": str(source), "sha256": file_hash},
        "destination": {
            "relative_path": os.path.relpath(destination, archive_root),
            "primary_category": category,
        },
        "operation": args.mode,
    }
    result = {
        "status": "dry-run" if args.dry_run else "archived",
        "source": str(source),
        "destination": str(destination),
        "metadata": str(sidecar),
        "primary_category": category,
        "sha256": file_hash,
        "operation": args.mode,
    }
    if args.dry_run:
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0

    if not destination_dir.exists():
        destination_dir.mkdir(parents=True, exist_ok=False)
    temp_file: Path | None = None
    temp_sidecar: Path | None = None
    published_destination = False
    published_sidecar = False
    try:
        with tempfile.NamedTemporaryFile(
            dir=destination_dir, prefix=f".{source.name}.", delete=False
        ) as handle:
            temp_file = Path(handle.name)
        shutil.copy2(source, temp_file)
        if sha256(temp_file) != file_hash:
            fail("copied file hash does not match source")

        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            dir=destination_dir,
            prefix=f".{sidecar.name}.",
            delete=False,
        ) as handle:
            temp_sidecar = Path(handle.name)
            handle.write(render_metadata(metadata))

        publish_exclusive(temp_file, destination)
        temp_file = None
        published_destination = True
        publish_exclusive(temp_sidecar, sidecar)
        temp_sidecar = None
        published_sidecar = True
        if args.mode == "move":
            source.unlink()
    except Exception:
        if published_sidecar and sidecar.exists():
            sidecar.unlink()
        if published_destination and destination.exists():
            destination.unlink()
        raise
    finally:
        for temporary in (temp_file, temp_sidecar):
            if temporary is not None and temporary.exists():
                temporary.unlink()

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError) as error:
        print(f"archive_file.py: {error}", file=sys.stderr)
        raise SystemExit(2)

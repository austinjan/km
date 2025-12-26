#!/usr/bin/env python3
"""
Nushell Config Sync Tool

Syncs Nushell configuration files between the repository and the system.
- push: Copy from os-config/nushell/ to system config path
- pull: Copy from system config path to os-config/nushell/
"""

import argparse
import difflib
import os
import shutil
import subprocess
import sys
from pathlib import Path

# Files to sync
CONFIG_FILES = ["config.nu", "env.nu"]


def get_system_config_dir() -> Path:
    """Get the Nushell system config directory."""
    # Try querying nu first
    try:
        result = subprocess.run(
            ["nu", "-c", "$nu.config-path | path dirname"],
            capture_output=True,
            text=True,
            check=True,
        )
        return Path(result.stdout.strip())
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass

    # Fallback to known default paths
    if sys.platform == "win32":
        appdata = os.environ.get("APPDATA")
        if appdata:
            return Path(appdata) / "nushell"
    else:
        # Linux/macOS
        xdg_config = os.environ.get("XDG_CONFIG_HOME")
        if xdg_config:
            return Path(xdg_config) / "nushell"
        return Path.home() / ".config" / "nushell"

    print("Error: Could not determine Nushell config path", file=sys.stderr)
    sys.exit(1)


def get_repo_config_dir() -> Path:
    """Get the repository config directory."""
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent.parent.parent  # .claude/skills/nushell-config-sync -> repo root
    return repo_root / "os-config" / "nushell"


def sync_file(src: Path, dst: Path, dry_run: bool = False) -> bool:
    """Copy a file from src to dst. Returns True if copied."""
    if not src.exists():
        print(f"  Skip: {src.name} (not found in source)")
        return False

    if dry_run:
        print(f"  Would copy: {src} -> {dst}")
        return True

    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    print(f"  Copied: {src.name}")
    return True


def push(dry_run: bool = False) -> None:
    """Push config from repo to system."""
    repo_dir = get_repo_config_dir()
    sys_dir = get_system_config_dir()

    print(f"Push: {repo_dir} -> {sys_dir}")
    if dry_run:
        print("(dry run)")
    print()

    for filename in CONFIG_FILES:
        sync_file(repo_dir / filename, sys_dir / filename, dry_run)


def pull(dry_run: bool = False) -> None:
    """Pull config from system to repo."""
    repo_dir = get_repo_config_dir()
    sys_dir = get_system_config_dir()

    print(f"Pull: {sys_dir} -> {repo_dir}")
    if dry_run:
        print("(dry run)")
    print()

    for filename in CONFIG_FILES:
        sync_file(sys_dir / filename, repo_dir / filename, dry_run)


def diff(filename: str | None = None) -> None:
    """Show diff between repo and system config files."""
    repo_dir = get_repo_config_dir()
    sys_dir = get_system_config_dir()

    files_to_diff = [filename] if filename else CONFIG_FILES

    for fname in files_to_diff:
        repo_file = repo_dir / fname
        sys_file = sys_dir / fname

        print(f"=== {fname} ===")

        if not repo_file.exists() and not sys_file.exists():
            print("  (not found in either location)\n")
            continue
        if not repo_file.exists():
            print(f"  (not found in repo: {repo_file})\n")
            continue
        if not sys_file.exists():
            print(f"  (not found in system: {sys_file})\n")
            continue

        repo_lines = repo_file.read_text(encoding="utf-8").splitlines(keepends=True)
        sys_lines = sys_file.read_text(encoding="utf-8").splitlines(keepends=True)

        diff_result = difflib.unified_diff(
            repo_lines,
            sys_lines,
            fromfile=f"repo/{fname}",
            tofile=f"system/{fname}",
        )
        diff_text = "".join(diff_result)

        if diff_text:
            print(diff_text)
        else:
            print("  (identical)\n")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Sync Nushell config files between repo and system"
    )
    parser.add_argument(
        "action",
        choices=["push", "pull", "diff"],
        help="push: repo->system, pull: system->repo, diff: compare files",
    )
    parser.add_argument(
        "--dry-run", "-n",
        action="store_true",
        help="Show what would be done without making changes",
    )
    parser.add_argument(
        "--file", "-f",
        help="Specific file to diff (default: all config files)",
    )

    args = parser.parse_args()

    if args.action == "push":
        push(args.dry_run)
    elif args.action == "pull":
        pull(args.dry_run)
    elif args.action == "diff":
        diff(args.file)


if __name__ == "__main__":
    main()

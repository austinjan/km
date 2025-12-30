#!/usr/bin/env python3
import subprocess
import shutil
from pathlib import Path

ROOT_DIR = Path(__file__).parent
KM_TOOLS_DIR = ROOT_DIR / "km-tools"

def build_km_tools():
    print("Building km-tools...")
    result = subprocess.run(
        ["cargo", "build", "--release"],
        cwd=KM_TOOLS_DIR,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print("Build failed:")
        print(result.stderr)
        return False
    print("Build successful")
    return True

def copy_binaries():
    target_dir = KM_TOOLS_DIR / "target" / "release"

    # Find all executable files (no extension on Unix, .exe on Windows)
    binaries = list(target_dir.glob("*.exe")) + [
        f for f in target_dir.iterdir()
        if f.is_file() and not f.suffix and f.stat().st_mode & 0o111
    ]

    # Filter out non-binary files
    exclude = {".d", ".pdb", ".lib", ".rlib"}
    binaries = [b for b in binaries if b.suffix not in exclude]

    for binary in binaries:
        dest = ROOT_DIR / binary.name
        print(f"Copying {binary.name} to {dest}")
        shutil.copy2(binary, dest)

def main():
    if build_km_tools():
        copy_binaries()
        print("Done!")

if __name__ == "__main__":
    main()

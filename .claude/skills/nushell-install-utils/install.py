#!/usr/bin/env python3
"""
Nushell Utilities Installation Tool

Installs and configures Nushell utilities like zoxide and starship.
Handles cross-platform installation and configuration.
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path


class UtilityInstaller:
    """Cross-platform Nushell utility installer."""

    def __init__(self):
        self.system_config_dir = self._get_system_config_dir()
        self.utilities = {
            "zoxide": {
                "init_cmd": ["zoxide", "init", "nushell"],
                "output_file": "zoxide.nu",
                "check_cmd": ["zoxide", "--version"],
                "install_info": {
                    "url": "https://github.com/ajeetdsouza/zoxide",
                    "windows": "winget install ajeetdsouza.zoxide",
                    "macos": "brew install zoxide",
                    "linux": "cargo install zoxide  # or use your package manager",
                },
            },
            "starship": {
                "init_cmd": ["starship", "init", "nu"],
                "output_file": "starship.nu",
                "check_cmd": ["starship", "--version"],
                "install_info": {
                    "url": "https://starship.rs/",
                    "windows": "winget install Starship.Starship",
                    "macos": "brew install starship",
                    "linux": "cargo install starship  # or use your package manager",
                },
            },
            "carapace": {
                "init_cmd": ["carapace", "_carapace", "nushell"],
                "output_file": "carapace.nu",
                "check_cmd": ["carapace", "--version"],
                "install_info": {
                    "url": "https://github.com/carapace-sh/carapace-bin",
                    "windows": "winget install carapace-sh.carapace",
                    "macos": "brew install carapace",
                    "linux": "cargo install carapace  # or download from GitHub releases",
                },
            },
            "bat": {
                "check_cmd": ["bat", "--version"],
                "install_info": {
                    "url": "https://github.com/sharkdp/bat",
                    "windows": "cargo install bat",
                    "macos": "cargo install bat",
                    "linux": "cargo install bat",
                },
            },
            "ripgrep": {
                "check_cmd": ["rg", "--version"],
                "install_info": {
                    "url": "https://github.com/BurntSushi/ripgrep",
                    "windows": "cargo install ripgrep",
                    "macos": "cargo install ripgrep",
                    "linux": "cargo install ripgrep",
                },
            },
            "fd": {
                "check_cmd": ["fd", "--version"],
                "install_info": {
                    "url": "https://github.com/sharkdp/fd",
                    "windows": "cargo install fd-find",
                    "macos": "cargo install fd-find",
                    "linux": "cargo install fd-find",
                },
            },
            "xh": {
                "check_cmd": ["xh", "--version"],
                "install_info": {
                    "url": "https://github.com/ducaale/xh",
                    "windows": "cargo install xh",
                    "macos": "cargo install xh",
                    "linux": "cargo install xh",
                },
            },
        }

    def _get_system_config_dir(self) -> Path:
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

    def _is_utility_installed(self, utility_name: str) -> bool:
        """Check if a utility is installed and available in PATH."""
        utility_info = self.utilities.get(utility_name)
        if not utility_info:
            return False

        try:
            subprocess.run(
                utility_info["check_cmd"],
                capture_output=True,
                check=True,
            )
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            return False

    def _get_install_command(self, utility_name: str) -> str:
        """Get the appropriate install command for the current platform."""
        utility_info = self.utilities.get(utility_name)
        if not utility_info or "install_info" not in utility_info:
            return ""

        install_info = utility_info["install_info"]

        if sys.platform == "win32":
            return install_info.get("windows", "")
        elif sys.platform == "darwin":
            return install_info.get("macos", "")
        else:
            return install_info.get("linux", "")

    def _install_utility_config(self, utility_name: str, force: bool = False) -> bool:
        """Install configuration for a specific utility."""
        utility_info = self.utilities.get(utility_name)
        if not utility_info:
            print(f"Error: Unknown utility '{utility_name}'", file=sys.stderr)
            return False

        # Check if utility is installed
        if not self._is_utility_installed(utility_name):
            print(f"[!] {utility_name} is not installed or not in PATH")

            install_cmd = self._get_install_command(utility_name)
            if install_cmd:
                print(f"    Install it with: {install_cmd}")

            if "install_info" in utility_info:
                print(f"    More info: {utility_info['install_info']['url']}")

            return False

        # If there's no init_cmd, it's just a binary install (like bat)
        if "init_cmd" not in utility_info:
            print(f"[OK] {utility_name} is already installed")
            return True

        output_path = self.system_config_dir / utility_info["output_file"]

        # Check if config already exists
        if output_path.exists() and not force:
            print(f"Skip: {output_path} already exists (use --force to overwrite)")
            return False

        # Create config directory if it doesn't exist
        self.system_config_dir.mkdir(parents=True, exist_ok=True)

        # Run init command and save output
        try:
            result = subprocess.run(
                utility_info["init_cmd"],
                capture_output=True,
                text=True,
                check=True,
            )

            output_path.write_text(result.stdout, encoding="utf-8")
            print(f"[OK] Installed: {output_path}")
            return True

        except subprocess.CalledProcessError as e:
            print(f"Error running {' '.join(utility_info['init_cmd'])}", file=sys.stderr)
            print(f"  {e.stderr}", file=sys.stderr)
            return False
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            return False

    def list_utilities(self) -> None:
        """List available utilities and their installation status."""
        print(f"Nushell config directory: {self.system_config_dir}\n")
        print("Available utilities:\n")

        for name, info in self.utilities.items():
            installed = self._is_utility_installed(name)
            status = "[YES]" if installed else "[NO]"

            print(f"  {name}")
            print(f"    Installed: {status}")

            # Only show config status if utility generates a config file
            if "output_file" in info:
                output_file = self.system_config_dir / info["output_file"]
                config_exists = output_file.exists()
                config_status = "[YES]" if config_exists else "[NO]"
                print(f"    Config:    {config_status} ({info['output_file']})")
            else:
                print(f"    Config:    N/A (no config file)")

            print()

    def install_all(self, force: bool = False) -> None:
        """Install all available utilities."""
        print(f"Installing Nushell utilities to: {self.system_config_dir}\n")

        success_count = 0
        for utility_name in self.utilities.keys():
            if self._install_utility_config(utility_name, force):
                success_count += 1

        print(f"\nInstalled {success_count}/{len(self.utilities)} utilities")

        if success_count > 0:
            print("\nNext steps:")
            print("  1. Restart your shell or run: source $nu.config-path")
            print("  2. Ensure utilities are sourced in your config.nu:")
            for info in self.utilities.values():
                output_file = self.system_config_dir / info["output_file"]
                if output_file.exists():
                    print(f"     source {output_file}")

    def install_specific(self, utility_names: list[str], force: bool = False) -> None:
        """Install specific utilities by name."""
        print(f"Installing utilities to: {self.system_config_dir}\n")

        success_count = 0
        for utility_name in utility_names:
            if utility_name not in self.utilities:
                print(f"Warning: Unknown utility '{utility_name}' (skipping)")
                continue

            if self._install_utility_config(utility_name, force):
                success_count += 1

        print(f"\nInstalled {success_count}/{len(utility_names)} utilities")

        if success_count > 0:
            print("\nNext steps:")
            print("  1. Restart your shell or run: source $nu.config-path")
            print("  2. Ensure utilities are sourced in your config.nu")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Install Nushell utility configurations (zoxide, starship, etc.)"
    )
    parser.add_argument(
        "utilities",
        nargs="*",
        help="Specific utilities to install (e.g., zoxide starship). If none specified, --list or --all is required.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Install all available utilities",
    )
    parser.add_argument(
        "--list",
        action="store_true",
        help="List available utilities and their status",
    )
    parser.add_argument(
        "--force", "-f",
        action="store_true",
        help="Overwrite existing configuration files",
    )

    args = parser.parse_args()

    installer = UtilityInstaller()

    if args.list:
        installer.list_utilities()
    elif args.all:
        installer.install_all(args.force)
    elif args.utilities:
        installer.install_specific(args.utilities, args.force)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()

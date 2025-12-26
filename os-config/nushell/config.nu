# config.nu
#
# Installed by:
# version = "0.109.1"
#
# This file is used to override default Nushell settings, define
# (or import) custom commands, or run any other startup tasks.
# See https://www.nushell.sh/book/configuration.html
#
# Nushell sets "sensible defaults" for most configuration settings, 
# so your `config.nu` only needs to override these defaults if desired.
#
# You can open this file in your default editor using:
#     config nu
#
# You can also pretty-print and page through the documentation for configuration
# options using:
#     config nu --doc | nu-highlight | less -R



source ~/.config/nushell/zoxide.nu
use ~/.config/nushell/starship.nu

# Set VS Code as editor
$env.EDITOR = "code --wait"
$env.VISUAL = "code --wait"

# Set VS Code as buffer editor (for editing command line with ctrl+o)
$env.config.buffer_editor = "code --wait"
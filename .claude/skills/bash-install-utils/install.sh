#!/usr/bin/env bash
#
# Shell Utilities Installation Script
# Installs: zoxide, starship, carapace, bat, ripgrep, fd, xh
# Sets up shell integration for prompt and completions (bash or zsh)
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if command exists
has_cmd() { command -v "$1" &>/dev/null; }

# Detect architecture
ARCH=$(uname -m)
case "$ARCH" in
    x86_64) ARCH="x86_64" ;;
    aarch64|arm64) ARCH="aarch64" ;;
    *) error "Unsupported architecture: $ARCH"; exit 1 ;;
esac

# Detect OS
OS=$(uname -s)
case "$OS" in
    Linux) OS="linux" ;;
    Darwin) OS="darwin" ;;
    *) error "Unsupported OS: $OS"; exit 1 ;;
esac

# Detect user's shell
detect_shell() {
    local user_shell
    user_shell=$(basename "$SHELL")
    case "$user_shell" in
        zsh) echo "zsh" ;;
        bash) echo "bash" ;;
        *) echo "bash" ;; # default to bash
    esac
}

USER_SHELL=$(detect_shell)
info "Detected shell: $USER_SHELL"

# Get the target for download URLs
get_target() {
    if [ "$OS" = "darwin" ]; then
        if [ "$ARCH" = "aarch64" ]; then
            echo "aarch64-apple-darwin"
        else
            echo "x86_64-apple-darwin"
        fi
    else
        echo "${ARCH}-unknown-linux-musl"
    fi
}

TARGET=$(get_target)

# ============================================================================
# Installation functions
# ============================================================================

install_build_essential() {
    if ! has_cmd cc; then
        info "Installing build-essential (needed for some cargo installs)..."
        sudo apt update && sudo apt install -y build-essential
    fi
}

install_zoxide() {
    if has_cmd zoxide; then
        info "zoxide already installed: $(zoxide --version)"
        return 0
    fi

    info "Installing zoxide..."
    # Try apt first (Ubuntu 21.04+)
    if sudo apt install -y zoxide 2>/dev/null; then
        info "zoxide installed via apt"
    else
        # Use official installer
        curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh
    fi
}

install_starship() {
    if has_cmd starship; then
        info "starship already installed: $(starship --version)"
        return 0
    fi

    info "Installing starship..."
    mkdir -p ~/.local/bin
    curl -sS https://starship.rs/install.sh | sh -s -- -y -b ~/.local/bin
}

install_carapace() {
    if has_cmd carapace; then
        info "carapace already installed: $(carapace --version)"
        return 0
    fi

    info "Installing carapace..."
    # Get latest release version
    CARAPACE_VERSION=$(curl -s https://api.github.com/repos/carapace-sh/carapace-bin/releases/latest | grep '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/')

    if [ -z "$CARAPACE_VERSION" ]; then
        error "Could not determine latest carapace version"
        return 1
    fi

    local carapace_os carapace_arch
    if [ "$OS" = "darwin" ]; then
        carapace_os="darwin"
    else
        carapace_os="linux"
    fi
    if [ "$ARCH" = "aarch64" ]; then
        carapace_arch="arm64"
    else
        carapace_arch="amd64"
    fi
    CARAPACE_URL="https://github.com/carapace-sh/carapace-bin/releases/download/v${CARAPACE_VERSION}/carapace-bin_${CARAPACE_VERSION}_${carapace_os}_${carapace_arch}.tar.gz"

    info "Downloading carapace v${CARAPACE_VERSION}..."
    TMP_DIR=$(mktemp -d)
    curl -sL "$CARAPACE_URL" | tar xz -C "$TMP_DIR"

    # Install to ~/.local/bin
    mkdir -p ~/.local/bin
    mv "$TMP_DIR/carapace" ~/.local/bin/
    rm -rf "$TMP_DIR"

    info "carapace installed to ~/.local/bin/carapace"
}

install_bat() {
    if has_cmd bat || has_cmd batcat; then
        info "bat already installed"
        return 0
    fi

    info "Installing bat..."
    BAT_VERSION=$(curl -s https://api.github.com/repos/sharkdp/bat/releases/latest | grep '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/')

    if [ -z "$BAT_VERSION" ]; then
        warn "Could not determine latest bat version"
        return 1
    fi

    BAT_URL="https://github.com/sharkdp/bat/releases/download/v${BAT_VERSION}/bat-v${BAT_VERSION}-${TARGET}.tar.gz"

    info "Downloading bat v${BAT_VERSION}..."
    TMP_DIR=$(mktemp -d)
    curl -sL "$BAT_URL" | tar xz -C "$TMP_DIR"

    mkdir -p ~/.local/bin
    mv "$TMP_DIR/bat-v${BAT_VERSION}-${TARGET}/bat" ~/.local/bin/
    rm -rf "$TMP_DIR"

    info "bat installed to ~/.local/bin/bat"
}

install_ripgrep() {
    if has_cmd rg; then
        info "ripgrep already installed: $(rg --version | head -1)"
        return 0
    fi

    info "Installing ripgrep..."
    RG_VERSION=$(curl -s https://api.github.com/repos/BurntSushi/ripgrep/releases/latest | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')

    if [ -z "$RG_VERSION" ]; then
        warn "Could not determine latest ripgrep version"
        return 1
    fi

    RG_URL="https://github.com/BurntSushi/ripgrep/releases/download/${RG_VERSION}/ripgrep-${RG_VERSION}-${TARGET}.tar.gz"

    info "Downloading ripgrep ${RG_VERSION}..."
    TMP_DIR=$(mktemp -d)
    curl -sL "$RG_URL" | tar xz -C "$TMP_DIR"

    mkdir -p ~/.local/bin
    mv "$TMP_DIR/ripgrep-${RG_VERSION}-${TARGET}/rg" ~/.local/bin/
    rm -rf "$TMP_DIR"

    info "ripgrep installed to ~/.local/bin/rg"
}

install_fd() {
    if has_cmd fd || has_cmd fdfind; then
        info "fd already installed"
        return 0
    fi

    info "Installing fd..."
    FD_VERSION=$(curl -s https://api.github.com/repos/sharkdp/fd/releases/latest | grep '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/')

    if [ -z "$FD_VERSION" ]; then
        warn "Could not determine latest fd version"
        return 1
    fi

    FD_URL="https://github.com/sharkdp/fd/releases/download/v${FD_VERSION}/fd-v${FD_VERSION}-${TARGET}.tar.gz"

    info "Downloading fd v${FD_VERSION}..."
    TMP_DIR=$(mktemp -d)
    curl -sL "$FD_URL" | tar xz -C "$TMP_DIR"

    mkdir -p ~/.local/bin
    mv "$TMP_DIR/fd-v${FD_VERSION}-${TARGET}/fd" ~/.local/bin/
    rm -rf "$TMP_DIR"

    info "fd installed to ~/.local/bin/fd"
}

install_xh() {
    if has_cmd xh; then
        info "xh already installed: $(xh --version)"
        return 0
    fi

    info "Installing xh..."
    # xh is not in apt, use cargo or download binary
    XH_VERSION=$(curl -s https://api.github.com/repos/ducaale/xh/releases/latest | grep '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/')

    if [ -z "$XH_VERSION" ]; then
        warn "Could not determine latest xh version, skipping"
        return 1
    fi

    XH_URL="https://github.com/ducaale/xh/releases/download/v${XH_VERSION}/xh-v${XH_VERSION}-${TARGET}.tar.gz"

    info "Downloading xh v${XH_VERSION}..."
    TMP_DIR=$(mktemp -d)
    curl -sL "$XH_URL" | tar xz -C "$TMP_DIR"

    mkdir -p ~/.local/bin
    mv "$TMP_DIR/xh-v${XH_VERSION}-${TARGET}/xh" ~/.local/bin/
    rm -rf "$TMP_DIR"

    info "xh installed to ~/.local/bin/xh"
}

# ============================================================================
# Shell integration setup
# ============================================================================

UTILS_BLOCK_START="# >>> shell-utils-init >>>"
UTILS_BLOCK_END="# <<< shell-utils-init <<<"
# Also match old block marker for migration
OLD_BLOCK_START="# >>> bash-utils-init >>>"
OLD_BLOCK_END="# <<< bash-utils-init <<<"

setup_shell_integration() {
    info "Setting up $USER_SHELL integration..."

    if [ "$USER_SHELL" = "zsh" ]; then
        RCFILE="$HOME/.zshrc"
    else
        RCFILE="$HOME/.bashrc"
    fi

    # Remove old block if exists (check both old and new markers)
    for marker_start in "$UTILS_BLOCK_START" "$OLD_BLOCK_START"; do
        if grep -q "$marker_start" "$RCFILE" 2>/dev/null; then
            info "Removing old utils integration block..."
            if [ "$OS" = "darwin" ]; then
                sed -i '' "/$marker_start/,/${marker_start/>>>/<<<}/d" "$RCFILE"
            else
                sed -i "/$marker_start/,/${marker_start/>>>/<<<}/d" "$RCFILE"
            fi
        fi
    done
    # Also clean up old block from .bashrc if we're now using .zshrc
    if [ "$USER_SHELL" = "zsh" ] && [ -f "$HOME/.bashrc" ]; then
        for marker_start in "$UTILS_BLOCK_START" "$OLD_BLOCK_START"; do
            if grep -q "$marker_start" "$HOME/.bashrc" 2>/dev/null; then
                info "Removing old block from .bashrc..."
                if [ "$OS" = "darwin" ]; then
                    sed -i '' "/$marker_start/,/${marker_start/>>>/<<<}/d" "$HOME/.bashrc"
                else
                    sed -i "/$marker_start/,/${marker_start/>>>/<<<}/d" "$HOME/.bashrc"
                fi
            fi
        done
    fi

    # Build new integration block
    INTEGRATION=""
    INTEGRATION+="$UTILS_BLOCK_START\n"
    INTEGRATION+="# Added by shell-install-utils\n"
    INTEGRATION+="\n"
    INTEGRATION+="# Add ~/.local/bin to PATH if not present\n"
    INTEGRATION+='[[ ":$PATH:" != *":$HOME/.local/bin:"* ]] && export PATH="$HOME/.local/bin:$PATH"'
    INTEGRATION+="\n\n"

    # Bat alias
    if has_cmd bat || has_cmd batcat; then
        INTEGRATION+="# Bat aliases\n"
        INTEGRATION+='alias cat="bat --paging=never"'
        INTEGRATION+="\n"
        INTEGRATION+='alias less="bat"'
        INTEGRATION+="\n\n"
    fi

    # Carapace
    if has_cmd carapace; then
        INTEGRATION+="# Carapace completions\n"
        INTEGRATION+="source <(carapace _carapace $USER_SHELL)"
        INTEGRATION+="\n\n"
    fi

    # Starship
    if has_cmd starship; then
        INTEGRATION+="# Starship prompt\n"
        INTEGRATION+="eval \"\$(starship init $USER_SHELL)\""
        INTEGRATION+="\n\n"
    fi

    # Zoxide (must be last)
    if has_cmd zoxide; then
        INTEGRATION+="# Zoxide - smarter cd (must be last)\n"
        INTEGRATION+="eval \"\$(zoxide init $USER_SHELL)\""
        INTEGRATION+="\n"
    fi

    INTEGRATION+="$UTILS_BLOCK_END"

    # Append to rc file
    echo -e "\n$INTEGRATION" >> "$RCFILE"

    info "Shell integration added to $RCFILE"
    info "Run 'source $RCFILE' or start a new terminal to activate"
}

# ============================================================================
# Main
# ============================================================================

show_status() {
    echo ""
    echo "Installation Status:"
    echo "===================="

    for cmd in zoxide starship carapace bat rg fd xh; do
        if has_cmd "$cmd"; then
            echo -e "  $cmd: ${GREEN}installed${NC}"
        elif [ "$cmd" = "bat" ] && has_cmd batcat; then
            echo -e "  $cmd: ${GREEN}installed (as batcat)${NC}"
        elif [ "$cmd" = "fd" ] && has_cmd fdfind; then
            echo -e "  $cmd: ${GREEN}installed (as fdfind)${NC}"
        else
            echo -e "  $cmd: ${RED}not installed${NC}"
        fi
    done
    echo ""
}

usage() {
    echo "Usage: $0 [OPTIONS] [UTILITIES...]"
    echo ""
    echo "Options:"
    echo "  --all       Install all utilities"
    echo "  --list      Show installation status"
    echo "  --setup     Only setup bash integration (no installs)"
    echo "  --help      Show this help"
    echo ""
    echo "Utilities: zoxide, starship, carapace, bat, ripgrep, fd, xh"
    echo ""
    echo "Examples:"
    echo "  $0 --all              # Install everything"
    echo "  $0 zoxide starship    # Install specific utilities"
    echo "  $0 --list             # Check what's installed"
}

main() {
    if [ $# -eq 0 ]; then
        usage
        exit 1
    fi

    case "$1" in
        --help|-h)
            usage
            exit 0
            ;;
        --list)
            show_status
            exit 0
            ;;
        --setup)
            setup_shell_integration
            exit 0
            ;;
        --all)
            info "Installing all utilities..."
            install_zoxide
            install_starship
            install_carapace
            install_bat
            install_ripgrep
            install_fd
            install_xh
            setup_shell_integration
            show_status
            ;;
        *)
            # Install specific utilities
            for util in "$@"; do
                case "$util" in
                    zoxide) install_zoxide ;;
                    starship) install_starship ;;
                    carapace) install_carapace ;;
                    bat) install_bat ;;
                    ripgrep|rg) install_ripgrep ;;
                    fd) install_fd ;;
                    xh) install_xh ;;
                    *) warn "Unknown utility: $util" ;;
                esac
            done
            setup_shell_integration
            show_status
            ;;
    esac
}

main "$@"

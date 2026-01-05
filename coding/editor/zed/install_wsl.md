# Install Zed on WSL

## Prerequisites
1. Vulkan dev libraries
```
sudo apt-get install libvulkan-dev
```
2. Add Mesa repository for better GPU drivers
```
sudo add-apt-repository ppa:kisak/kisak-mesa
sudo apt update
sudo apt upgrade
```
3. Install Zed
```
curl -f https://zed.dev/install.sh | sh
```
4. Setup environment
  - set `ZED_ALLOW_EMULATED_GPU=1` in your shell profile (e.g., `~/.bashrc`)
  - set alias `alias zed="WAYLAND_DISPLAY='' zed"`

# Mac Mini 遠端開發環境設定

Mac Mini 作為遠端開發機，透過 Tailscale + SSH + tmux 建立穩定的開發環境。

## 架構

```
本地電腦 → Tailscale VPN → Mac Mini (SSH) → tmux session → 開發工作
```

---

## 1. 安裝 Homebrew

Mac Mini 上執行（需要 admin 權限）：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安裝完成後設定 PATH：

```bash
# Apple Silicon (M1/M2/M3/M4)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Intel Mac
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```

驗證：

```bash
brew --version
```

## 2. 安裝 tmux

```bash
brew install tmux
tmux -V
```

### tmux 基本操作

| 指令 | 說明 |
|------|------|
| `tmux new -s dev` | 建立名為 dev 的 session |
| `tmux attach -t dev` | 重新接回 session |
| `tmux ls` | 列出所有 session |
| `Ctrl+b d` | 暫時離開（detach） |
| `Ctrl+b c` | 新增 window |
| `Ctrl+b n` / `Ctrl+b p` | 切換 window |
| `Ctrl+b %` | 水平分割 pane |
| `Ctrl+b "` | 垂直分割 pane |
| `Ctrl+b 方向鍵` | 切換 pane |

### tmux 斷線保護

SSH 斷線時，tmux session 仍然存活。重新 SSH 連上後 `tmux attach` 即可恢復工作環境。

## 3. 開啟 SSH（Remote Login）

### 透過系統設定

系統設定 → 一般 → 共享 → 開啟 **遠端登入（Remote Login）**

### 或用指令

```bash
sudo systemsetup -setremotelogin on
```

### 驗證

```bash
ssh localhost
```

## 4. SSH Key 設定（免密碼登入）

在**本地電腦**執行：

```bash
# 產生 key（如果還沒有的話）
ssh-keygen -t ed25519

# 複製 public key 到 Mac Mini
ssh-copy-id macmini-au@<mac-mini-ip>
```

## 5. SSH 安全加固

編輯 Mac Mini 上的 `/etc/ssh/sshd_config`：

```
PasswordAuthentication no          # 只允許 key 登入
PermitRootLogin no                 # 禁止 root 登入
AllowUsers macmini-au              # 只允許特定用戶
```

重啟 SSH 服務：

```bash
sudo launchctl stop com.openssh.sshd
sudo launchctl start com.openssh.sshd
```

> 注意：修改前確保 SSH key 已設定完成，否則會鎖住自己。

## 6. 安裝 Tailscale

Tailscale 讓你在任何網路環境都能連到 Mac Mini，不需要設定 port forwarding 或固定 IP。

### Mac Mini 安裝

> **注意：** `brew install --cask tailscale` 需要 sudo 權限，在 SSH session 中可能無法輸入密碼。
> 建議改用以下方式安裝：

**方法 A：App Store 安裝（推薦）**

1. 在 Mac Mini 上開啟 App Store
2. 搜尋 "Tailscale" 並安裝
3. 這不需要 sudo，也會自動處理系統擴充

**方法 B：Homebrew（需要有 GUI 或互動式 terminal）**

```bash
brew install --cask tailscale
```

**方法 C：手動下載 pkg**

```bash
# 下載最新版
curl -LO https://pkgs.tailscale.com/stable/Tailscale-latest-macos.pkg

# 安裝（需要 sudo，必須在互動式 terminal 執行）
sudo installer -pkg Tailscale-latest-macos.pkg -target /
```

### 啟動 Tailscale

```bash
# 開啟 Tailscale app（會出現在 menu bar）
open -a Tailscale
```

首次啟動會開啟瀏覽器要求登入，登入後 Mac Mini 就會加入你的 Tailscale network。

### 確認 Tailscale 狀態

```bash
# 查看 Tailscale 分配的 IP 和 hostname
tailscale status

# 查看本機 Tailscale IP
tailscale ip
```

### 本地電腦也安裝 Tailscale

在你要連線的電腦上也安裝 Tailscale，並登入**同一個帳號**：

- **macOS**: App Store 或 `brew install --cask tailscale`
- **Windows**: https://tailscale.com/download/windows
- **Linux**: https://tailscale.com/download/linux
- **iOS/Android**: 各自的 App Store

### 確認兩台機器互通

```bash
# 在本地電腦上
tailscale status                          # 確認兩台都 online
tailscale ping macmini-audemac-mini       # 測試連線
ssh macmini-au@macmini-audemac-mini       # 用 Tailscale hostname 連線
```

> **Tailscale hostname** 通常是機器的 hostname 小寫化，例如 `macmini-audemac-mini`。
> 實際 hostname 請用 `tailscale status` 確認。

## 7. 本地 SSH Config

在本地電腦 `~/.ssh/config` 加入：

```
Host mini
    HostName macmini-audemac-mini    # Tailscale hostname（用 tailscale status 確認）
    User macmini-au
    ForwardAgent yes                 # 轉發 SSH agent（方便 git 操作）
    ServerAliveInterval 60           # 每 60 秒發 keepalive
    ServerAliveCountMax 3            # 3 次沒回應才斷線
```

之後連線只需：

```bash
ssh mini
```

> 如果 Tailscale hostname 解析有問題，可以改用 Tailscale IP（用 `tailscale ip` 查看）。

## 8. 從其他電腦連線到 Mac Mini

### 快速連線步驟

```bash
# 1. 確認本地電腦的 Tailscale 已開啟
tailscale status

# 2. SSH 連線
ssh mini                           # 用 SSH config alias
# 或
ssh macmini-au@macmini-audemac-mini  # 用完整 Tailscale hostname

# 3. 接回或建立 tmux session
tmux attach -t dev || tmux new -s dev
```

### VS Code Remote SSH

1. 安裝 VS Code 的 "Remote - SSH" extension
2. `Cmd+Shift+P` → "Remote-SSH: Connect to Host" → 選 `mini`
3. 體驗跟本地開發幾乎一樣

### Claude Code

```bash
ssh mini
tmux attach -t dev || tmux new -s dev
claude
```

## 日常使用流程

```bash
# 1. 連線
ssh mini

# 2. 接回或建立 tmux session
tmux attach -t dev || tmux new -s dev

# 3. 開始工作...

# 4. 離開時 detach（不是關掉 terminal）
# Ctrl+b d

# 5. 下次再 ssh mini → tmux attach 就回來了
```

---

## 注意事項

### 環境變數差異

SSH 登入的 shell 環境可能跟直接在 Mac Mini 開 terminal 不同：

- SSH 走的是 **login shell**，讀 `~/.zprofile` → `~/.zshrc`
- 直接開 terminal 走 **interactive shell**，只讀 `~/.zshrc`
- GUI app 設的環境變數（如 `launchctl setenv`）SSH 拿不到

確保 PATH 和重要變數都寫在 `~/.zshrc` 裡。

### Port Forwarding（存取遠端 Dev Server）

遠端跑 dev server 時，用 SSH port forwarding 在本地瀏覽器存取：

```bash
# 把 Mac Mini 的 3000 port 轉到本地 3000
ssh -L 3000:localhost:3000 mini

# 多個 port 同時轉發
ssh -L 3000:localhost:3000 -L 5173:localhost:5173 mini
```

也可以在 `~/.ssh/config` 中固定設定：

```
Host mini
    LocalForward 3000 localhost:3000
    LocalForward 5173 localhost:5173
```

### 檔案傳輸

```bash
# 本地 → Mac Mini
scp file.txt mini:~/code/

# Mac Mini → 本地
scp mini:~/code/file.txt .

# 大量檔案用 rsync
rsync -avz ./project/ mini:~/code/project/
```

### Mac Mini 防止睡眠

Mac Mini 睡著就斷線。確保關閉自動睡眠：

```bash
# 查看目前設定
sudo pmset -g

# 防止睡眠（接電源時）
sudo pmset -a sleep 0
sudo pmset -a disablesleep 1
```

也可透過：系統設定 → 能源 → 確認「防止自動進入睡眠」已開啟。

### 磁碟空間

遠端機器磁碟滿了會很麻煩，定期留意：

```bash
df -h
```

### 注意事項總覽

| 項目 | 重點 |
|------|------|
| tmux | 必用，防斷線遺失工作 |
| keepalive | SSH config 加 `ServerAliveInterval` |
| 環境變數 | 寫在 `~/.zshrc`，別依賴 GUI 設定 |
| dev server | 用 SSH port forwarding 存取 |
| 睡眠 | 關掉自動睡眠 |
| 磁碟 | 定期檢查空間 |

---

## Troubleshooting

### SSH 連不上
- 確認 Mac Mini 的 Remote Login 有開啟：`sudo systemsetup -getremotelogin`
- 確認兩台機器的 Tailscale 都在線：`tailscale status`
- 試試用 Tailscale IP 而非 hostname：`ssh macmini-au@<tailscale-ip>`

### Tailscale 裝不上（sudo 問題）
- 在 SSH session 中無法輸入 sudo 密碼時，改用 App Store 安裝
- 或者在 Mac Mini 本機直接操作（接螢幕鍵盤，或用 Screen Sharing）

### tmux session 消失
- Mac Mini 重新開機後 tmux session 會消失，需要重新建立
- 考慮用 `tmux-resurrect` plugin 來保存 session

# macOS 電源管理 - pmset

在 macOS 上可以使用 `pmset` 指令管理電源設定。

## 常用指令

```bash
# 查看目前電源設定
pmset -g

# 設定螢幕 10 分鐘後關閉
sudo pmset displaysleep 10
```

## 說明

- `pmset -g` — 顯示目前所有電源管理設定
- `sudo pmset displaysleep <分鐘>` — 設定螢幕在指定分鐘數後自動關閉

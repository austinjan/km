---
title: mitmproxy：監看 Pi Agent HTTP/HTTPS
tags: [mitmproxy, network-tools, http, https, proxy, pi-agent, debugging]
created: 2026-07-22
summary: 以 mitmproxy 攔截並檢視 Pi Coding Agent HTTP/HTTPS request 的安裝、執行範例與憑證安全提醒。
related: [coding/tools/network-tools/README.md, coding/pi-coding-agent/README.md]
---

# mitmproxy：監看 Pi Agent HTTP/HTTPS

[mitmproxy](https://github.com/mitmproxy/mitmproxy) 是可檢視、修改與重送 HTTP/HTTPS、HTTP/2、WebSocket 流量的攔截代理；[Pi](https://github.com/earendil-works/pi) 支援 `HTTP_PROXY`、`HTTPS_PROXY`。

## 安裝

macOS（官方建議）：

```sh
brew install --cask mitmproxy
```

Linux 可下載[官方 binary](https://docs.mitmproxy.org/stable/overview/installation/)，或執行 `uv tool install mitmproxy`。

## 監看 Pi request

終端 A 啟動 Web UI（proxy `8080`、介面 `http://127.0.0.1:8081`）：

```sh
mitmweb --listen-host 127.0.0.1 --listen-port 8080
```

首次啟動會在 `~/.mitmproxy/` 產生 CA。終端 B 讓 Node 信任該 CA，並只替這次 Pi 執行設定代理：

```sh
HTTP_PROXY=http://127.0.0.1:8080 \
HTTPS_PROXY=http://127.0.0.1:8080 \
NODE_EXTRA_CA_CERTS="$HOME/.mitmproxy/mitmproxy-ca-cert.pem" \
pi
```

送出無敏感資料的測試提示，在 Web UI 選 flow，從 Request 檢查 URL、headers 與 body；可用 `~d api\.anthropic\.com` 等 filter 聚焦 provider。結束按 `Ctrl+C`。

> 僅攔截自己或獲授權的流量。內容可能含 API key、OAuth token、prompt 與程式碼，勿分享 flow 或 CA 私鑰；測試後關閉代理。TLS pinning 的程式可能拒絕連線，參考[憑證指南](https://docs.mitmproxy.org/stable/concepts/certificates/)。

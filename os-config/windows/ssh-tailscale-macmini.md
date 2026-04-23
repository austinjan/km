---
title: Windows SSH to Mac Mini via Tailscale
tags: [windows, ssh, tailscale, mac-mini, remote-dev]
created: 2026-04-23
summary: Troubleshooting and setup guide for SSH-ing from Windows to Mac Mini using Tailscale MagicDNS
related: [os-config/darwin/mac-mini-remote-setup.md]
---

# Windows SSH to Mac Mini via Tailscale

## Problem

`ssh mini` fails with a garbled hostname resolution error:

```
ssh: Could not resolve hostname mini: <garbled bytes>
```

## Root Causes

Two things need to be in place:

1. **Tailscale must be running on the Windows machine** — without it, MagicDNS hostnames can't resolve
2. **`~/.ssh/config` must have a `Host mini` entry** — the alias doesn't exist by default

## Fix

### 1. Install and start Tailscale

Download from https://tailscale.com/download/windows, install, and log in with your account.

Verify both machines are online:

```powershell
& "C:\Program Files\Tailscale\tailscale.exe" status
```

The Mac Mini should appear in the list. Note the exact Tailscale hostname (e.g. `macmini-aumac-mini`).

### 2. Add SSH config alias

Add to `~/.ssh/config`:

```
Host mini
  HostName macmini-aumac-mini
  User macmini-au
  ForwardAgent yes
  ServerAliveInterval 60
  ServerAliveCountMax 3
```

> The Tailscale hostname may differ from what's documented — always confirm with `tailscale status`.

### 3. Connect

```bash
ssh mini
```

## Notes

- The Tailscale hostname in the km doc (`macmini-audemac-mini`) was wrong — actual hostname is `macmini-aumac-mini`. Always verify with `tailscale status` rather than relying on docs.
- If Tailscale tray icon is missing, it's not running — launch `C:\Program Files\Tailscale\tailscale-ipn.exe` or reinstall.

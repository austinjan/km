# PowerShell Clip Last Command + Output (Windows 11)

Copy the last command and its output to clipboard with a keybinding.

## Setup

Add to PowerShell profile (`$PROFILE`):

```powershell
# Ctrl+Y: re-run last command and copy "PS> command\noutput" to clipboard
Set-PSReadLineKeyHandler -Chord 'Ctrl+y' -ScriptBlock {
    $lastCmd = (Get-History -Count 1).CommandLine
    $output = Invoke-Expression $lastCmd 2>&1 | Out-String
    "PS> $lastCmd`n$output".TrimEnd() | Set-Clipboard
    [Microsoft.PowerShell.PSConsoleReadLine]::InvokePrompt()
    Write-Host "Copied to clipboard!" -ForegroundColor Green
}
```

If profile doesn't exist yet:

```powershell
if (!(Test-Path $PROFILE)) { New-Item -Path $PROFILE -Force }
notepad $PROFILE   # paste the snippet, save
. $PROFILE         # reload
```

## Usage

1. Run any command normally (e.g. `Get-ChildItem`)
2. Press **Ctrl+Y**
3. Clipboard now contains:

```
PS> Get-ChildItem
    Directory: C:\Users\you\project

Mode         LastWriteTime     Length Name
----         -------------     ------ ----
d----   2026/03/30  10:00            src
-a---   2026/03/30  10:00       1234 README.md
```

## How It Works

| Component | Purpose |
|-----------|---------|
| `Set-PSReadLineKeyHandler` | Binds Ctrl+Y in the PSReadLine input handler |
| `Get-History -Count 1` | Gets the last executed command |
| `Invoke-Expression` | Re-executes the command to capture output |
| `Set-Clipboard` | Copies result to Windows clipboard |
| `InvokePrompt()` | Redraws the prompt after output |

## Note

This **re-executes** the last command to capture its output. Avoid using after destructive commands (`Remove-Item`, `git push`, etc.).

## macOS Equivalent

See [zsh-clip-last.md](../darwin/zsh-clip-last.md) for the macOS/zsh version using `pbcopy`.

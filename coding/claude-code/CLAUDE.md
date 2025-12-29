# Global Claude Code Configuration

## Preferred CLI Tools

This project uses modern Rust-based CLI tools as replacements for traditional Unix utilities. When performing operations, **always prefer** the following tools:

### Search and Find

- **Use `rg` (ripgrep)** instead of `grep` for text searching
  - Example: `rg "pattern" --type py` instead of `grep -r "pattern" *.py`
  - ripgrep is faster and has better defaults (respects .gitignore)

- **Use `fd`** instead of `find` for file searching
  - Example: `fd "*.txt"` instead of `find . -name "*.txt"`
  - fd is faster and has simpler syntax

### File Display

- **Use `bat`** instead of `cat` for viewing files
  - Example: `bat file.py` instead of `cat file.py`
  - bat provides syntax highlighting and line numbers
  - Note: An alias `cat = bat` is configured in Nushell

### HTTP Requests

- **Use `xh`** instead of `curl` or `httpie` for HTTP requests
  - Example: `xh GET https://api.example.com/data`
  - xh has friendly syntax and better defaults



## Available Utilities

1. **bat** - cat clone with syntax highlighting
2. **ripgrep (rg)** - Fast recursive grep
3. **fd** - Fast file finder
4. **xh** - HTTP client
5. **zoxide** - Smarter cd command
6. **starship** - Cross-shell prompt
7. **carapace** - Multi-shell completion generator

## Notes for Claude Code

When you need to:
- Search for text in files → Use `rg` instead of Bash grep
- Find files by name/pattern → Use `fd` instead of Bash find
- Display file contents → Use `bat` instead of Bash cat
- Make HTTP requests → Use `xh` instead of curl
- Always prefer these tools in your Bash tool calls for better performance and user experience

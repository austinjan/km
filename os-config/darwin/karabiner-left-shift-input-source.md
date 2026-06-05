# Karabiner: Left Shift Switches Input Source

## Goal

Use the left Shift key to switch macOS input sources when it is tapped alone, while keeping normal Shift behavior when it is held or combined with another key.

This setup uses Karabiner-Elements to send the standard macOS shortcut:

- Tap `left_shift` alone: send `control + space`
- Hold `left_shift`: normal Shift
- Use `left_shift` with another key: normal Shift combination

## Software To Install

Install Karabiner-Elements:

- Website: <https://karabiner-elements.pqrs.org/>
- Homebrew:

```sh
brew install --cask karabiner-elements
```

After installation, open Karabiner-Elements once and approve the required macOS permissions when prompted.

Common permissions to check:

- System Settings -> Privacy & Security -> Input Monitoring
- System Settings -> Privacy & Security -> Accessibility

Make sure Karabiner-Elements and Karabiner-EventViewer are allowed if macOS asks.

## macOS Input Source Shortcut

The Karabiner rule below sends `control + space`, so macOS must have that shortcut enabled for switching input sources.

Check:

1. Open System Settings.
2. Go to Keyboard.
3. Open Keyboard Shortcuts.
4. Select Input Sources.
5. Enable the shortcut for selecting the previous input source.
6. Set it to `control + space` if it is not already.

If Caps Lock also switches input source, that is usually macOS built-in behavior, not Karabiner.

To disable Caps Lock switching:

1. Open System Settings.
2. Go to Keyboard.
3. Find Text Input.
4. Click Edit.
5. Disable the option similar to "Use the Caps Lock key to switch to and from ABC".

## Karabiner Configuration

Edit:

```sh
~/.config/karabiner/karabiner.json
```

Add this rule under the selected profile:

```json
{
  "complex_modifications": {
    "rules": [
      {
        "description": "Left shift alone switches input source",
        "manipulators": [
          {
            "type": "basic",
            "from": {
              "key_code": "left_shift",
              "modifiers": {
                "optional": ["any"]
              }
            },
            "to": [
              {
                "key_code": "left_shift"
              }
            ],
            "to_if_alone": [
              {
                "key_code": "spacebar",
                "modifiers": ["left_control"]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

If `complex_modifications.rules` already exists, add only the rule object to the existing `rules` array.

## Example Full Minimal Profile

```json
{
  "profiles": [
    {
      "name": "Default profile",
      "selected": true,
      "virtual_hid_keyboard": {
        "keyboard_type_v2": "ansi"
      },
      "complex_modifications": {
        "rules": [
          {
            "description": "Left shift alone switches input source",
            "manipulators": [
              {
                "type": "basic",
                "from": {
                  "key_code": "left_shift",
                  "modifiers": {
                    "optional": ["any"]
                  }
                },
                "to": [
                  {
                    "key_code": "left_shift"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "spacebar",
                    "modifiers": ["left_control"]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
```

## Verify

1. Open any text field.
2. Tap `left_shift` once.
3. Confirm the input source changes.
4. Hold `left_shift` and type a letter.
5. Confirm the letter is uppercase and Shift still works normally.

Validate the JSON after editing:

```sh
bun -e 'JSON.parse(await Bun.file(`${process.env.HOME}/.config/karabiner/karabiner.json`).text()); console.log("karabiner.json valid")'
```

## Backup And Rollback

Before editing:

```sh
cp ~/.config/karabiner/karabiner.json ~/.config/karabiner/karabiner.json.bak-left-shift
```

To rollback:

```sh
cp ~/.config/karabiner/karabiner.json.bak-left-shift ~/.config/karabiner/karabiner.json
```

Karabiner usually reloads configuration automatically after the file changes. If it does not, quit and reopen Karabiner-Elements.

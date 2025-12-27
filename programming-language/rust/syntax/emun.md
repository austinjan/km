## Enum

```rust
enum Message {
    // Unit variant: no data, represents a simple signal or command
    Quit,

    // Struct-like variant: named fields for clear, self-documenting data
    Move { x: i32, y: i32 },

    // Tuple-like variant with a single value: carries a message or payload
    Write(String),

    // Tuple-like variant with multiple values: grouped data with positional meaning (e.g. RGB)
    ChangeColor(i32, i32, i32),
}

```

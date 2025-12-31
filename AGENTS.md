# Repository Guidelines

## Project Structure & Modules
- `src/llm/` contains all provider logic: the core trait (`provider.rs`), helpers, and concrete backends (`openai.rs`, `gemini.rs`).  
- `examples/` holds runnable demos such as `interactive_agent.rs` and `openai_basic.rs`; use these for manual smoke tests.  
- `doc/` stores reference material (e.g., `GEMINI_API.md`, design notes).  
- Tests live next to their modules (e.g., `src/llm/tests.rs`, provider-specific `#[cfg(test)]` blocks), so co-locate new cases with the code they exercise.

## Build, Test, and Development Commands
- `cargo fmt` – apply repository-wide Rust formatting before committing.  
- `cargo check --all-features` – verify OpenAI/Gemini code compiles together.  
- `cargo test --all-features` – run unit tests and doctests. Use `cargo test --doc src/llm/helpers.rs` after editing Markdown examples.  
- `cargo run --example interactive_agent --features "openai gemini" -- --provider=gemini` – manual chat-loop check with both providers enabled.

## Coding Style & Naming
- Default Rust style: 4-space indentation, `snake_case` for items, `CamelCase` for types.  
- Keep files ASCII; add brief comments only for logic that is not self-explanatory.  
- Prefer `cargo fmt` + `clippy` hints to keep code consistent with the rest of the repo.

## Testing Guidelines
- Name tests `test_<area>_<scenario>` (e.g., `test_prune_tool_turns_exceeds_limit`).  
- Add unit tests alongside the implementation file; use doctests for documentation samples.  
- For features requiring API keys, document manual verification steps instead of adding secrets to CI.

## Commit & Pull Request Guidelines
- Commit messages should be imperative and scoped (e.g., `Implement Gemini chat loop pruning`).  
- Describe PR scope, list validation commands (`cargo test`, `cargo run --example …`), and mention any new env vars (`GEMINI_API_KEY`, `OPENAI_MODEL`).  
- Attach screenshots or terminal snippets when changing CLI output or examples so reviewers can see the new behavior.  
- Keep PRs focused; large multi-provider changes should be split into logical commits for easier review.

## Security & Configuration Tips
- Never commit credentials. Load keys via env vars (`OPENAI_API_KEY`, `GEMINI_API_KEY`) and pass models through `OPENAI_MODEL`/`GEMINI_MODEL` when testing.  
- Document new endpoints or headers in `doc/` so future contributors can reproduce requests without re-reading upstream docs.

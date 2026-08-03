---
name: aaserver-client
description: Use aaserver safely through its supported aaclient CLI. Use this skill whenever the user asks an agent to discover aaserver capabilities, retrieve or upload files and documents, work with assets, or perform any other aaserver API operation. The skill covers authentication, live command discovery, JSON input, binary output, and safe recovery without exposing credentials.
compatibility: Requires the aaclient CLI, Node.js 24 or newer, and macOS or Windows for native credential storage.
---

# Use aaserver through aaclient

Resolve `scripts/aaclient` relative to this `SKILL.md` and invoke that resolved path; do not assume
the user's current working directory is the skill directory. It delegates to the supported
`aaclient` installed on the machine and keeps access and refresh credentials outside the agent
context. Commands below use the short relative path for readability.

## Start every workflow with authentication state

Run:

```sh
scripts/aaclient auth state --json
```

If the result has `authenticated: true`, continue. Reuse the selected profile unless the user asks
for another server or profile.

If authentication is missing, expired, revoked, or otherwise requires login, tell the user before
starting it:

> I need to authenticate aaclient. This will open an aaserver page in your browser. Sign in if
> prompted, review the requested access, choose Approve, and return here after the browser confirms
> authorization.

Then run:

```sh
scripts/aaclient auth login
```

The command asks for the exact aaserver origin, opens the system browser, and waits on an exact
loopback callback. The user may first see the aaserver sign-in page and then an `Authorize aaclient`
page. They must review the signed-in account and scopes, select **Approve**, and allow the browser to
return to the local callback. A denial is final for that attempt; do not retry without asking.

After the browser flow finishes, run `scripts/aaclient auth state --json` again. Continue only when
it reports `authenticated: true` for the intended server and account.

For a known server in a non-interactive shell, provide the origin explicitly:

```sh
scripts/aaclient auth login --server https://aaserver.example.com --non-interactive
```

`--non-interactive` skips only the terminal question. Browser sign-in and approval remain
interactive. Use `--profile <name>` on state, login, logout, and API commands when multiple servers
or accounts are configured.

### Authentication safety

- Never ask the user for an access token, refresh token, bearer header, password, vault entry, or
  browser callback URL.
- Never call token export commands or inspect credential stores. aaclient intentionally refuses to
  print credentials.
- Let aaclient renew short-lived access internally. If state or an operation returns
  `AUTHENTICATION_REQUIRED`, use its safe recovery command or run `auth login`, then retry the
  original operation once.
- Run `scripts/aaclient auth logout --json` only when the user asks to sign out or revoke this local
  client session.

## Understand what aaclient can do

Do not rely on a copied command list because the server publishes operations dynamically.

1. Run `scripts/aaclient --help` to discover live capability groups.
2. Run `scripts/aaclient <group> --help` to list that group's operations.
3. Run `scripts/aaclient <group> <operationId> --help` for the compact execution guide.
4. When exact machine-readable details are needed, run:

   ```sh
   scripts/aaclient docs <operationId> --json
   ```

Follow the returned preconditions, confirmation rules, input constraints, recovery guidance, and
recommended verification operation. Prefer summary operations before paginated lists and follow
`next_cursor` until `has_more` is false only when the user's task requires every result.

## Execute an operation

Supply one JSON input document through stdin so secrets and large values do not appear in process
arguments:

```sh
scripts/aaclient <group> <operationId> --input - --json <<'JSON'
{
  "path": {},
  "query": {},
  "headers": {},
  "body": {},
  "files": {},
  "content_type": "application/json"
}
JSON
```

Use only fields required by the operation:

- `path`: values for `{parameter}` path placeholders.
- `query`: scalar or array query values, including limits and opaque cursors.
- `headers`: operation-owned headers such as `idempotency-key` and confirmation headers. Never add
  authorization, cookies, host, content length, or other transport-owned headers.
- `body`: JSON, YAML text, URL-encoded fields, or multipart fields.
- `files`: multipart field names mapped to local file paths.
- `content_type`: one of the encodings documented by the selected operation.

For non-idempotent operations, generate a fresh UUID idempotency key once and reuse that same key
only when retrying the identical request. For validate-confirm-execute workflows, show the preview
or warnings to the user and obtain the required confirmation before executing.

JSON results use a stable envelope containing `ok`, `operation_id`, `status_code`, and `response`.
If `ok` is false, follow the typed recovery action rather than guessing a raw HTTP request.

## Retrieve documents and other binary content

For a document stored as an Asset, use this discovery-first workflow:

1. Run `scripts/aaclient assets --help` and confirm that `listAssets`, `getAsset`,
   `getAssetRevision`, and `downloadAssetFile` are currently available.
2. Read `scripts/aaclient docs listAssets --json`, then list with `kind: DOCUMENT`, the narrowest
   useful `name` filter, and a bounded `limit`. Use `scope: all` unless the user asks for only
   common, owned, or directly shared content.
3. If multiple summaries match, show their names, descriptions, access, and revision numbers and ask
   the user which one they mean. Do not choose by name alone.
4. Call `getAsset` for the selected `asset_id`. Use its `current_revision_id` unless the user asks
   for an older revision.
5. Call `getAssetRevision` with that asset and revision. Select the required file from its `files`
   metadata by role, path, media type, and size.
6. Read `scripts/aaclient docs downloadAssetFile --json`, then download using the exact IDs:

   ```sh
   scripts/aaclient assets downloadAssetFile --input - --output ./new-document-name <<'JSON'
   {
     "path": {
       "asset_id": "selected-asset-id",
       "revision_id": "selected-revision-id",
       "file_id": "selected-file-id"
     }
   }
   JSON
   ```

For caller-owned raw files that have not been organized as Assets, discover the `files` group and
use its list/detail/download workflow instead. Never substitute a `/files` operation for content
that is accessible only through an Asset grant or common visibility.

Inspect detail or revision metadata before downloading so the selected ID, revision, media type,
size, and integrity are understood.

Binary operations require a new destination path:

```sh
scripts/aaclient <group> <operationId> --input - --output ./new-file-name
```

aaclient refuses to overwrite an existing path. Keep that protection; choose a new path or ask the
user before replacing anything. For a SKILL asset, preserve the server's install/update and
user/project-scope confirmation flow, inspect `SKILL.md` plus bundled files, and install only after
the user confirms both action and scope.

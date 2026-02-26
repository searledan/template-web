---
description: Address PR review comments following a structured workflow. Use when asked to handle, address, or resolve PR review threads (e.g. from GitHub Copilot).
---

# PR Review Workflow

When addressing PR review comments (e.g. from GitHub Copilot), follow this structured workflow.

## 1. Analyse

Enter plan mode and read all unresolved review threads using the `gh` CLI (e.g. `gh api repos/{owner}/{repo}/pulls/{number}/comments`). For each thread, categorise it:

- **Code change needed** — a fix, improvement, or alignment is required
- **Reply only** — no code change needed (e.g. the reviewer is mistaken or the pattern is intentional)

Build a plan that includes:
- A summary table of all threads with comment IDs, thread IDs, file, and action
- The specific code changes required for each "code change" thread
- The rationale for each "reply only" thread
- An implementation order

## 2. Implement

Apply all code changes, then run the full test suite:

```bash
npm run test
```

## 3. Commit and Push

Commit and push **before** replying to threads. This ensures commit SHA references in replies are accurate.

## 4. Reply to Threads

**Always use the `gh` CLI for all GitHub interactions** (reading PR comments, posting replies, resolving threads). Never use MCP GitHub tools — the personal access token lacks the required permissions.

- **Post replies**: `gh api repos/{owner}/{repo}/pulls/{number}/comments/{commentId}/replies -f body='...'`
- **Resolve threads**: `gh api graphql -f query='mutation { resolveReviewThread(input: { threadId: "..." }) { thread { isResolved } } }'`

Reply to every thread, then resolve it. Follow these reply standards:

### Commit SHA format (mandatory)

**Every reply MUST include a clickable commit link** using the full GitHub URL format:

```
https://github.com/{owner}/{repo}/commit/{full-sha}
```

Use Markdown link syntax with the short SHA as the display text:

```
[`aa65912`](https://github.com/{owner}/{repo}/commit/aa65912abc123...)
```

Get the full SHA with `git rev-parse HEAD` after committing. This creates a clickable audit trail in the PR thread.

### Code fix threads

> Fixed in [`<short-sha>`](https://github.com/{owner}/{repo}/commit/{full-sha}) — `<brief explanation of what changed and why>`.

Examples:
- "Fixed in [`aa65912`](https://github.com/{owner}/{repo}/commit/aa65912abc123def456) — added blank line for readability."
- "Fixed in [`aa65912`](https://github.com/{owner}/{repo}/commit/aa65912abc123def456) — now uses a local variable for the updated entity instead of re-indexing the array, which avoids the `T | undefined` return type from `noUncheckedIndexedAccess`."

### Reply-only threads (no code change needed)

> Include the commit SHA link that the thread relates to (i.e. the latest commit at the time of the reply) so the codebase state is traceable. Explain the rationale with references (documentation links, language/framework specs, etc.). Don't just dismiss the suggestion.

Examples:
- "No change needed as of [`aa65912`](https://github.com/{owner}/{repo}/commit/aa65912abc123def456) — this is correct React 19 syntax. React 19 supports rendering a Context directly as a provider and deprecated `Context.Provider`. See the [React 19 migration guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#context-as-a-provider)."
- "No change needed as of [`aa65912`](https://github.com/{owner}/{repo}/commit/aa65912abc123def456) — the `?? ""` is required here. With `noUncheckedIndexedAccess` enabled, `split("T")[0]` is typed as `string | undefined`, but the field expects `string`. Removing it causes a type error."

### General reply standards

- **Every reply MUST include a clickable commit link** — no exceptions
- Include enough context that someone reading the thread later understands the resolution without clicking through to the diff
- For grouped fixes (same pattern across multiple files), cross-reference the primary thread

## 5. Resolve and Verify

- Resolve all threads after replying
- Confirm the push succeeds and CI passes

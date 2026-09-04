# AGENTS.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Python Quality & Verification Gates

**Always enforce the 3-step verification loop. All three must pass.**

For any Python modifications:
1. **Lint & Code Style**: Run `uv run ruff check --fix`. If manual errors remain, create an implementation plan and fix them cleanly without using `# noqa` suppressions.
2. **Type Checking**: Run `uv run ty check`. If type diagnostics are found, create an implementation plan and fix the underlying typing without using `# type: ignore`.
3. **Test Suite**: Run `uv run pytest` to confirm all unit and integration tests pass without regression.
4. **Iterative Verification**: Keep looping through `uv run ruff check --fix`, `uv run ty check`, and `uv run pytest` until all three yield **0 errors, 0 warnings, and all tests pass**.

**The 3 mandatory commands that must always work:**
- `uv run ruff check --fix` (0 errors, 0 warnings)
- `uv run ty check` (0 errors, 0 warnings)
- `uv run pytest` (all tests pass)

## 6. Update README.md

**Always keep `README.md` in sync with codebase changes.**

- Explicitly update `README.md` whenever adding, modifying, or removing features, API endpoints, environment variables, dependencies, or workflows.
- Ensure all setup instructions, configuration options, and usage examples remain accurate and up-to-date.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

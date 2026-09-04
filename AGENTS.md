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

## 5. JavaScript / TypeScript / Node Quality & Verification Gates

**Always enforce the verification loop. Use `pnpm` exclusively (never `npm`, `yarn`, or `bun`).**

For any JavaScript / TypeScript / Node modifications:

1. **Package Manager**: Use `pnpm` explicitly for all package installations and script executions. Do not use `npm`, `yarn`, or `bun`.
2. **Lint & Code Style**: Run `pnpm run lint:fix` (`oxlint --fix`) and `pnpm run fmt:check` (`oxfmt --check`). Fix any remaining issues cleanly without disabling rules.
3. **Type Checking**: Run `pnpm run type-check` (`tsc --noEmit`). Fix type diagnostics cleanly without using `@ts-ignore` or arbitrary `any`.
4. **Test Suite**: Run `pnpm test` (`vitest run`) to confirm all tests pass without regression.
5. **Build Verification**: Run `pnpm run build` (`next build`) to confirm production builds compile cleanly.
6. **Iterative Verification**: Keep looping through `pnpm run lint:fix`, `pnpm run fmt:check`, `pnpm run type-check`, `pnpm test`, and `pnpm run build` until all yield **0 errors, 0 warnings, and clean builds**.

**The mandatory commands that must always pass:**

- `pnpm run lint:fix` (0 errors, 0 warnings)
- `pnpm run fmt:check` (0 formatting issues)
- `pnpm run type-check` (0 errors, 0 warnings)
- `pnpm test` (all tests pass)
- `pnpm run build` (clean exit 0)

## 6. Update README.md

**Always keep `README.md` in sync with codebase changes.**

- Explicitly update `README.md` whenever adding, modifying, or removing features, API endpoints, environment variables, dependencies, or workflows.
- Ensure all setup instructions, configuration options, and usage examples remain accurate and up-to-date.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

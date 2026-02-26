# Claude Code Instructions

This file contains instructions for Claude Code when working with this project. It's structured in two parts:
1. **Template Maintenance** - Instructions for maintaining this template itself
2. **Project Usage Guide** - Example instructions you can copy/modify for projects created from this template

---

## Part 1: Template Maintenance Instructions

> **Note**: This section is for maintaining the template repository itself. When using this template for a new project, delete or modify this section.

### Template Philosophy

This is a **flexible starter template** with sensible defaults and best practices. When working on this template:

- **DO**: Maintain minimal, sensible defaults that work out of the box
- **DO**: Keep example code simple and demonstrative
- **DO**: Document configuration choices clearly
- **DO NOT**: Add overly specific patterns or abstractions
- **DO NOT**: Include business logic beyond simple examples
- **DO NOT**: Make the template too opinionated about architecture

### Code Quality Standards

All changes to the template must pass:

```bash
npm run test  # Runs: typecheck + lint + vitest + build
```

Before committing changes:
1. Ensure all tests pass
2. Run `npm run lint:fix` to format code
3. Update README.md if adding/changing features
4. Update this CLAUDE.md if changing structure or patterns

### Continuous Integration

The template includes a GitHub Actions workflow (`.github/workflows/test.yml`) that runs automatically on:
- Pushes to `main`, `staging`, and `development` branches
- All pull requests

The CI pipeline runs type checking, linting, tests, and build to ensure code quality.

### Template Skills

This template includes **Claude Code Skills** to enforce consistent patterns when creating new code. Skills are invoked with slash commands.

#### Available Skills

**`/create-component`** - Create a new React component
- Generates component file with TypeScript interface
- Creates skeleton loading state component
- Creates test file with Testing Library
- Creates Storybook story with controls and autodocs
- Optionally creates CSS Module for custom styling
- Location: `.claude/skills/create-component/SKILL.md`

**`/create-page`** - Create a new page component
- Generates page file with proper naming (`.page.tsx`)
- Updates Router configuration
- Includes loading/error/empty state patterns
- Adds proper route configuration
- Location: `.claude/skills/create-page/SKILL.md`

**`/create-hook`** - Create a custom React hook
- Generates hook file with proper naming (`use[Name].ts`)
- Adds comprehensive JSDoc documentation
- Includes TypeScript types for parameters and returns
- Creates tests for complex hooks
- Location: `.claude/skills/create-hook/SKILL.md`

**`/create-service`** - Scaffold a service + React Query hook pair
- Creates model type, service file, and hook file(s)
- Follows established error handling patterns (no try/catch)
- Includes test file for hooks
- Location: `.claude/skills/create-service/SKILL.md`

**`/review-pr`** - Address PR review comments
- Reads unresolved review threads via `gh` CLI
- Categorises threads as code changes or reply-only
- Commits fixes, then replies with clickable commit links
- Resolves all threads after replying
- Location: `.claude/skills/review-pr/SKILL.md`

#### Using Skills

When maintaining this template:

```bash
# Create a new component following template patterns
/create-component

# Create a new page with routing
/create-page

# Create a custom hook
/create-hook

# Scaffold a service + hook pair
/create-service
```

The skills will ask clarifying questions and ensure:
- Consistent file structure
- Proper naming conventions
- Complete test coverage
- Storybook stories (for components)
- TypeScript best practices
- Mantine component usage

#### Updating Skills

When you discover better patterns or practices:
1. Update the relevant skill file in `.claude/skills/`
2. Update example components to reflect the new pattern
3. Document the change in this file
4. Run full test suite to ensure consistency

### Configuration Approach

This template uses **"sensible defaults"** rather than explicit configuration:

- **Biome**: Uses recommended defaults for linting/formatting (only overrides in `biome.json`)
- **TypeScript**: Strict mode with additional safety checks
- **React Query**: Minimal config for good DX (staleTime, gcTime)
- **Mantine**: Minimal theme override - ready for customisation

When adding new tools, prefer their recommended defaults unless there's a strong reason to override.

### Demo Code Guidelines

The demo features (`DemoProvider`, `UserProvider`, etc.) serve as examples of:
- React Query integration with context
- Custom hooks pattern
- Service layer pattern
- Routing with React Router
- Testing setup
- Skeleton loading states

Keep demo code:
- **Simple**: Easy to understand and remove
- **Representative**: Shows real patterns, not toy examples
- **Tested**: Includes test examples
- **Documented**: Has JSDoc comments where helpful

### Dependencies Management

- **Keep current**: Template should use latest stable versions
- **Minimize additions**: Only add dependencies that most projects would need
- **Document choices**: Explain in README why each major dependency is included
- **Dependabot**: Enabled for automated updates - review and test before merging

### Testing Requirements

All example code should include tests:
- **Components**: At least one test demonstrating Testing Library usage
- **Hooks**: Test key functionality
- **Services**: Test data transformations/error handling
- **Stories**: Storybook stories for visual components

---

## Part 2: Project Usage Guide (For Projects Created From This Template)

> **For New Projects**: Copy and customise this section for your project-specific needs. Delete Part 1 above.

### Project Overview

<!-- Replace with your project description -->
This project is built using the Mantine Vite Template with React 19, TypeScript, and modern tooling.

**Key Technologies:**
- React 19 with TypeScript (strict mode)
- Mantine UI for components
- React Query for data fetching and caching
- React Router for navigation
- Vitest for testing with React Testing Library
- Storybook for component development
- Biome for linting and formatting
- GitHub Actions for CI

### Development Workflow

#### Prerequisites

- **Node.js**: Version specified in `.nvmrc` — use `nvm use` to switch
- **GitHub CLI**: Required for PR review workflows — installed automatically in the devcontainer

#### Starting Development

```bash
npm run dev              # Start dev server at localhost:5173
npm run storybook        # Start Storybook at localhost:6006
npm run storybook:build  # Build static Storybook
```

#### Code Quality Checks

Before committing changes:

```bash
npm run test         # Full suite: typecheck + lint + vitest + build
```

Or individually:

```bash
npm run typecheck    # TypeScript type checking
npm run lint         # Biome linting
npm run lint:fix     # Auto-fix formatting issues
npm run vitest       # Run tests
```

#### Version Bumping

Always bump the version when making changes:

```bash
npm run version:patch   # Bug fixes (1.0.0 → 1.0.1)
npm run version:minor   # New features (1.0.0 → 1.1.0)
npm run version:major   # Breaking changes (1.0.0 → 2.0.0)
```

These update `package.json` without creating a git tag. Include the version bump in the relevant commit.

### File Organisation

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context definitions
├── hooks/          # Custom React hooks
├── mantine/        # Mantine component customisations
├── models/         # TypeScript types/interfaces
├── pages/          # Route destination components
├── providers/      # Context providers with logic
├── services/       # API/data layer
└── utils/          # Utility functions, test helpers, theme
```

### File Naming Conventions

- **Components**: `ComponentName.tsx` (PascalCase)
- **Pages**: `PageName.page.tsx`
- **Tests**: `ComponentName.test.tsx`
- **Stories**: `ComponentName.stories.tsx`
- **Styles**: `ComponentName.module.css` (if using CSS Modules)
- **Hooks**: `use[Name].ts` (camelCase with `use` prefix)
- **Services**: `modelNameService.ts` (camelCase with `Service` suffix)
- **Models**: `ModelName.ts` (PascalCase)

### Import Conventions

#### Path aliases

Use `@/` for all cross-module imports. Relative paths (`./`) are only for same-directory files (tests, stories, skeletons, CSS modules) and out-of-`src/` imports (e.g. `.storybook/`).

```typescript
// Correct — @/ for cross-module
import { DemoTableCard } from "@/components/DemoTableCard/DemoTableCard";
import { useDemo } from "@/hooks/useDemo";

// Correct — relative for same-directory
import { DemoTableCard } from "./DemoTableCard";
import styles from "./DemoTableCard.module.css";

// Incorrect — barrel exports
import { DemoTableCard } from "@/components/DemoTableCard";

// Incorrect — relative for cross-module
import { useDemo } from "../../hooks/useDemo";
```

#### Import ordering

Group imports in this order, separated by blank lines if needed:

1. External libraries (`@mantine/core`, `react`, `@tanstack/react-query`)
2. Internal `@/` imports (components, hooks, contexts, services, models)
3. Relative imports (`./Component`, `./styles.module.css`)

#### Type imports

Use `import type` for type-only imports. Use inline `{ type X }` only when mixing type and value imports from the same module.

```typescript
// Correct — separate type import
import type { Demo } from "@/models/Demo";

// Correct — inline when mixing type and value
import { type ReactNode, useMemo } from "react";

// Incorrect — value import for types
import { Demo } from "@/models/Demo";
```

#### No barrel exports

Do not create `index.ts` barrel export files (exception: `src/utils/test/index.ts`). Import directly from source files. This improves tree-shaking, build times, and avoids circular dependency issues.

### Code Patterns

#### State Management

- **Server State**: React Query for data fetching and caching
- **Application State**: React Context for shared app state
- **Component State**: `useState` for local component state

#### Skeleton Loading States

Each data-displaying component should have a corresponding skeleton component:

```
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentNameSkeleton.tsx
├── ComponentName.test.tsx
└── ComponentName.stories.tsx
```

#### API Integration

Place API calls in `src/services/`, consume via custom hooks in `src/hooks/` using React Query.

#### Error Handling

- **Services**: Let errors propagate — do not wrap in `try/catch`. React Query handles errors via `isError` state.
- **Mutations**: Throw on failure and return meaningful data (e.g. the updated entity) on success. Avoid returning booleans.
- **Providers**: Use `onSuccess`/`onError` callbacks for user-facing notifications (e.g. Mantine notifications). Keep `onSettled` for query invalidation.

#### Testing

Use the custom render function that includes providers:

```typescript
import { render, screen } from "@/utils/test";
```

All new features should include:
- Unit tests for components and utilities
- Storybook stories for visual components

### Configuration

- **TypeScript**: Strict mode with `noUncheckedIndexedAccess`, `noImplicitReturns`; path alias `@/*` → `./src/*`
- **Biome**: Linting with recommended defaults; assist actions recommended; CSS/HTML formatting disabled; uses `.gitignore` for file filtering
- **React Query**: `staleTime: 60s`, `gcTime: 5min`
- **Mantine**: Minimal theme in `src/utils/theme.ts`, colour scheme set to `auto`

### Claude Code Skills

#### Available Skills

- **`/create-component`** — Generate a component with skeleton, tests and Storybook story
- **`/create-page`** — Generate a page component and update Router
- **`/create-hook`** — Generate a custom React hook with types and tests
- **`/create-service`** — Scaffold a service + React Query hook pair with model type
- **`/review-pr`** — Address PR review comments with structured workflow

#### PR Review Workflow

All steps are **required before merge**:

1. **Proactive review** — Run `/pr-review-toolkit:review-pr` (plugin) to catch issues. Fix any findings, commit, and re-run until clean.
2. **Copilot review** — Once the proactive review is clean, push changes and request a Copilot review on the PR. Wait for Copilot to leave its comments.
3. **Reactive review** — Run `/review-pr` (project skill) to address Copilot and any human review comments. This reads threads, makes fixes, commits, replies, and resolves them. All threads must be resolved before merge.

#### Code Review Standards

- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors
- [ ] Biome checks pass
- [ ] New features include tests
- [ ] No `console.log` or `debugger` statements
- [ ] Version bumped appropriately

### Git Workflow

- **`main`** – Production-ready code (protected)
- **`staging`** – Pre-production testing (protected)
- **`development`** – Active development integration (protected)
- **`feature/**`** – New features (branch from `development`)
- **`hotfix/**`** – Urgent production fixes (branch from `main`)
- **`release/**`** – Release preparation (branch from `development`)

**Protected branches**: `main`, `staging`, and `development` are protected — all changes must be merged via pull request. Never push directly to these branches.

CI runs automatically on pushes to `main`, `staging`, and `development`, and on all pull requests.

### Environment Variables

Environment variables must be prefixed with `VITE_`:

```env
# .env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=My Application
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

Add types in `src/vite-env.d.ts`:
```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
}
```

### Template Demo Code

The project includes demo code from the web template (DemoProvider, UserProvider, demo pages, etc.) that demonstrates React Query, context, hooks, routing and skeleton loading state patterns. This code serves as a working reference and should be replaced incrementally as real features are built.

See these components for complete examples:

- `DemoProvider.tsx` / `UserProvider.tsx` - React Query + Context pattern
- `useDemoById.ts` / `useUserById.ts` - Custom hooks with queries
- `Demo.page.tsx` / `Users.page.tsx` - List views with loading/error states
- `DemoTableCard/` / `UserCard/` - Components with skeleton loading states
- `Welcome.test.tsx` - Component testing example

You can safely remove this demo code when starting your project (see README.md for removal instructions).

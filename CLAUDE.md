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

### Template Skills

This template includes **Claude Code Skills** to enforce consistent patterns when creating new code. Skills are invoked with slash commands.

#### Available Skills

**`/create-component`** - Create a new React component
- Generates component file with TypeScript interface
- Creates test file with Testing Library
- Creates Storybook story with controls and autodocs
- Optionally creates CSS Module for custom styling
- Location: `.claude/skills/create-component.md`

**`/create-page`** - Create a new page component
- Generates page file with proper naming (`.page.tsx`)
- Updates Router configuration
- Includes loading/error/empty state patterns
- Adds proper route configuration
- Location: `.claude/skills/create-page.md`

**`/create-hook`** - Create a custom React hook
- Generates hook file with proper naming (`use[Name].ts`)
- Adds comprehensive JSDoc documentation
- Includes TypeScript types for parameters and returns
- Creates tests for complex hooks
- Location: `.claude/skills/create-hook.md`

#### Using Skills

When maintaining this template:

```bash
# Create a new component following template patterns
/create-component

# Create a new page with routing
/create-page

# Create a custom hook
/create-hook
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

The demo feature (`DemoProvider`, `DemoContext`, etc.) serves as an example of:
- React Query integration with context
- Custom hooks pattern
- Service layer pattern
- Routing with React Router
- Testing setup

Keep demo code:
- **Simple**: Easy to understand and remove
- **Representative**: Shows real patterns, not toy examples
- **Tested**: Includes test examples
- **Documented**: Has JSDoc comments where helpful

### File Organisation

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context definitions
├── hooks/          # Custom React hooks
├── models/         # TypeScript types/interfaces
├── pages/          # Route destination components
├── providers/      # Context providers with logic
├── services/       # API/data layer
└── utils/          # Utility functions, test helpers, theme
```

Maintain this structure in examples but don't enforce it in documentation (users may prefer feature-based organisation).

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
- React 19 with TypeScript
- Mantine UI for components
- React Query for data fetching
- React Router for navigation
- Vitest for testing
- Storybook for component development

### Development Workflow

#### Starting Development

```bash
npm run dev          # Start dev server at localhost:5173
npm run storybook    # Start Storybook at localhost:6006
```

#### Code Quality Checks

Before committing changes:

```bash
npm run typecheck    # Check TypeScript types
npm run lint         # Check code quality with Biome
npm run vitest       # Run tests
npm test             # Run full test suite
```

Auto-fix formatting issues:
```bash
npm run lint:fix
```

#### Creating New Features

When adding new features:

1. **Create page components** in `src/pages/`
2. **Add reusable components** in `src/components/`
3. **Define types** in `src/models/`
4. **Add data services** in `src/services/`
5. **Update routing** in `src/Router.tsx`
6. **Write tests** alongside your code
7. **Add stories** for visual components

#### File Naming Conventions

- **Components**: `ComponentName.tsx` (PascalCase)
- **Pages**: `PageName.page.tsx`
- **Tests**: `ComponentName.test.tsx`
- **Stories**: `ComponentName.stories.tsx`
- **Styles**: `ComponentName.module.css` (if using CSS Modules)
- **Utilities**: `utilityName.ts` (camelCase)

### Code Patterns

#### State Management

- **Server State**: Use React Query for data fetching and caching
  ```typescript
  const { data, isPending, isError } = useQuery({
    queryKey: ['resource'],
    queryFn: fetchResource,
  })
  ```

- **Application State**: Use React Context for shared app state
  ```typescript
  // See DemoProvider.tsx for example
  ```

- **Component State**: Use `useState` for local component state

#### API Integration

Place API calls in `src/services/`:

```typescript
// src/services/apiService.ts
export const fetchData = async (): Promise<Data[]> => {
  const response = await fetch('/api/data')
  if (!response.ok) throw new Error('Failed to fetch')
  return response.json()
}
```

Use with React Query:

```typescript
// src/hooks/useData.ts
export const useData = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  })
}
```

#### Testing Components

Use the custom render function that includes providers:

```typescript
import { render, screen } from '@/utils/test'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })
})
```

#### Routing

Add routes in `src/Router.tsx`:

```typescript
const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
    ],
  },
])
```

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

### Styling

This project uses Mantine's styling system:

**Customise theme** in `src/utils/theme.ts`:
```typescript
export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
  // Add your customisations
})
```

**Component styling**:
- Use Mantine's component props for styling
- CSS Modules for custom styles (optional)
- Mantine's emotion-based styling for complex cases

### Common Tasks

#### Adding a New Page

1. Create page component: `src/pages/NewPage.page.tsx`
2. Add route in `src/Router.tsx`
3. Create tests: `src/pages/NewPage.test.tsx`
4. Add navigation links if needed

#### Adding a New API Endpoint

1. Create service: `src/services/newService.ts`
2. Define types: `src/models/NewModel.ts`
3. Create custom hook: `src/hooks/useNew.ts`
4. Use hook in components

#### Creating a Shared Component

1. Create component: `src/components/NewComponent/NewComponent.tsx`
2. Add props interface
3. Create tests: `src/components/NewComponent/NewComponent.test.tsx`
4. Create Storybook story: `src/components/NewComponent/NewComponent.stories.tsx`
5. Export from component directory

**Or use the skill for consistency:**
```bash
/create-component
```

### Using Skills for Consistent Code Generation

This template includes Claude Code Skills to maintain consistent patterns across your codebase.

#### Creating Components

Use `/create-component` to generate a new component with:
- Component file with TypeScript props interface
- Test file with Testing Library setup
- Storybook story with controls and autodocs
- Optional CSS Module for custom styling

**Example:**
```
You: /create-component
Claude: What is the component's purpose?
You: A user profile card that displays avatar, name, and bio
Claude: [Creates UserProfileCard with all files]
```

#### Creating Pages

Use `/create-page` to generate a new page with:
- Page file with proper naming convention
- Loading/error/empty state handling
- Router configuration updates
- Navigation links

**Example:**
```
You: /create-page
Claude: What is the page's purpose and URL path?
You: Display list of users at /users
Claude: [Creates UsersPage and updates Router]
```

#### Creating Hooks

Use `/create-hook` to generate a custom hook with:
- Proper naming (`use[Name]`)
- TypeScript types and JSDoc documentation
- Tests for complex logic
- Appropriate pattern (React Query, Context, State, etc.)

**Example:**
```
You: /create-hook
Claude: What problem does this hook solve?
You: Fetch user data by ID using React Query
Claude: [Creates useUserById hook]
```

#### Benefits of Using Skills

- **Consistency**: All code follows the same patterns
- **Completeness**: Never forget tests or Storybook stories
- **Best Practices**: Skills enforce TypeScript, testing, and documentation
- **Speed**: Generate boilerplate quickly
- **Maintainability**: Easy to understand and update

### Build and Deployment

#### Production Build

```bash
npm run build        # Creates optimised build in dist/
npm run preview      # Preview production build locally
```

#### Storybook Build

```bash
npm run storybook:build  # Creates static Storybook in storybook-static/
```

#### Deployment Checklist

- [ ] Update environment variables for production
- [ ] Run `npm test` to ensure all checks pass
- [ ] Build successfully with `npm run build`
- [ ] Test production build with `npm run preview`
- [ ] Update `package.json` version
- [ ] Review bundle size (check dist/ folder)

### Troubleshooting

Common issues and solutions are documented in README.md under the Troubleshooting section.

**Quick Reference:**

- **Port in use**: `npm run dev -- --port 3000`
- **Formatting issues**: `npm run lint:fix`
- **TypeScript errors**: `npm run typecheck`
- **Clear all caches**: `rm -rf node_modules dist .vite && npm install`

### Project-Specific Guidelines

<!-- Add your project-specific conventions here -->

#### Code Review Standards
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] Biome checks pass
- [ ] New features include tests
- [ ] Complex logic is documented
- [ ] No console.logs or debugger statements

#### Component Guidelines
- Use TypeScript interfaces for all props
- Add JSDoc comments for complex components
- Keep components focused and single-purpose
- Prefer composition over complex props

#### Git Workflow
<!-- Document your Git workflow/branching strategy -->

#### Additional Resources
<!-- Link to design systems, API docs, etc. -->

---

## Working with Claude Code

When requesting changes from Claude Code:

- **Be specific**: "Add a user profile page with avatar and bio" rather than "add user stuff"
- **Reference existing patterns**: "Follow the pattern used in DemoProvider" helps maintain consistency
- **Request tests**: "Include tests for this component"
- **Ask for explanations**: "Explain why you chose this approach" helps understand decisions

### Helpful Commands

```bash
# Run full quality checks
npm test

# Watch tests during development
npm run vitest:watch

# Format all files
npm run lint:fix

# Type check without building
npm run typecheck
```

### Template Demo Code

The template includes demo code showing best practices:

- `DemoProvider.tsx` - React Query + Context pattern
- `useDemoById.ts` - Custom hook with query
- `Demo.page.tsx` - List view with loading/error states
- `Welcome.test.tsx` - Component testing example

You can safely remove this demo code when starting your project (see README.md for removal instructions).

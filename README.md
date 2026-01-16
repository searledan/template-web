# Web Template

A modern React web application template built with Vite, Mantine UI, and TypeScript. This template is designed to be a solid starting point for future projects, featuring a complete development setup with testing, linting, and component documentation.

Inspired by the [official Mantine Vite template](https://github.com/mantinedev/vite-template/tree/master/src).

## Features

This template includes the following technologies and tools:

- **[Vite](https://vite.dev/)** – Lightning-fast build tool and development server
- **[React 19](https://react.dev/)** – Latest version of React with modern features
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe development with strict mode enabled
- **[Mantine UI](https://mantine.dev/)** – Comprehensive React component library
- **[React Query](https://tanstack.com/query/latest)** – Powerful data synchronisation for React
- **[React Router](https://reactrouter.com/)** – Client-side routing
- **[PostCSS](https://postcss.org/)** with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset) – Enhanced styling capabilities
- **[Biome](https://biomejs.dev/)** – Fast linter and formatter (replaces ESLint & Prettier)
- **[Vitest](https://vitest.dev/)** – Unit testing framework with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- **[Storybook](https://storybook.js.org/)** – Component development and documentation
- **[GitHub Actions](https://github.com/features/actions)** – Automated CI pipeline for testing and building

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc` – currently v24.13.0)
- npm (v11 or higher recommended)

### Installation

1. Clone this repository or use it as a template
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## NPM Scripts

### Development Scripts

- `npm run dev` – Start Vite development server
- `npm run build` – Build production version (includes TypeScript compilation)
- `npm run preview` – Locally preview production build

### Testing & Quality Scripts

- `npm run typecheck` – Check TypeScript types
- `npm run lint` – Run Biome linter checks
- `npm run lint:fix` – Run Biome linter and auto-fix issues
- `npm run vitest` – Run all tests once
- `npm run vitest:watch` – Run tests in watch mode
- `npm run vitest:storybook` – Run Storybook component tests
- `npm run test` – Run full test suite (typecheck + lint + vitest + build)

### Storybook Scripts

- `npm run storybook` – Start Storybook development server on port 6006
- `npm run storybook:build` – Build production Storybook bundle to `storybook-static`

## Project Structure

```
template-web/
├── .github/
│   ├── dependabot.yml      # Automated dependency updates
│   └── workflows/
│       └── test.yml        # CI pipeline for testing and building
├── .storybook/
│   ├── main.ts            # Storybook configuration
│   ├── preview.tsx        # Storybook preview config with Mantine provider
│   └── vitest.setup.ts    # Vitest setup for Storybook tests
├── public/
│   └── favicon.svg        # Application favicon
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ColorSchemeToggle/  # Theme switcher component
│   │   ├── DemoTableCard/      # Demo table card with skeleton
│   │   ├── UserCard/           # User card with skeleton
│   │   └── Welcome/            # Welcome component with tests
│   ├── contexts/          # React Context definitions
│   │   ├── DemoContext.tsx     # Context for demo feature
│   │   └── UserContext.tsx     # Context for user feature
│   ├── hooks/             # Custom React hooks
│   │   ├── useDemo.ts          # Hook to consume DemoContext
│   │   ├── useDemoById.ts      # React Query hook for fetching demo by ID
│   │   ├── useUserById.ts      # React Query hook for fetching user by ID
│   │   └── useUsers.ts         # React Query hook for fetching users
│   ├── mantine/           # Mantine component customisations/examples
│   │   └── Button/             # Example button stories
│   ├── models/            # TypeScript type definitions
│   │   ├── Demo.ts             # Demo model definition
│   │   └── User.ts             # User model definition
│   ├── pages/             # Page components (route destinations)
│   │   ├── Home.page.tsx       # Home page
│   │   ├── Demo.page.tsx       # Demo listing page
│   │   ├── DemoId.page.tsx     # Individual demo page
│   │   └── Users.page.tsx      # Users listing page
│   ├── providers/         # React Context providers
│   │   ├── DemoProvider.tsx    # Demo provider with React Query
│   │   └── UserProvider.tsx    # User provider with React Query
│   ├── services/          # API/data services
│   │   ├── demoService.ts      # Demo data service (mock)
│   │   ├── demos.json          # Demo mock data
│   │   ├── userService.ts      # User data service (mock)
│   │   └── users.json          # User mock data
│   ├── utils/             # Utility functions and helpers
│   │   ├── test/
│   │   │   ├── index.ts        # Test utility exports
│   │   │   └── render.tsx      # Custom render for testing with providers
│   │   └── theme.ts            # Mantine theme configuration
│   ├── App.tsx            # Main application component with providers
│   ├── Layout.tsx         # Layout component for routing
│   ├── Router.tsx         # React Router configuration
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite environment type definitions
├── .editorconfig          # Cross-platform editor configuration
├── .gitignore             # Git ignore rules
├── .nvmrc                 # Node version specification
├── biome.json             # Biome linter and formatter configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── postcss.config.cjs     # PostCSS configuration for Mantine
├── tsconfig.json          # TypeScript configuration
├── vite.config.mjs        # Vite configuration with testing setup
├── vitest.setup.mjs       # Vitest global setup
└── vitest.shims.d.ts      # Vitest type shims
```

## Configuration Philosophy

This template follows a **"sensible defaults"** approach to configuration. Rather than explicitly defining every possible option, it relies on the recommended defaults provided by each tool, with overrides only where necessary.

### TypeScript (`tsconfig.json`)

- **Strict Mode**: Enabled with additional strict checks (`noUncheckedIndexedAccess`, `noImplicitReturns`, etc.)
- **Module Resolution**: Uses `bundler` mode for optimal Vite compatibility
- **Path Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **Modern Target**: `ESNext` for maximum feature availability

### Biome (`biome.json`)

Biome is configured to use its **recommended defaults** for both linting and formatting. The configuration file only contains explicit overrides:

- **Formatting**: Uses Biome's recommended formatter (tab indentation by default)
- **Linting**: Uses Biome's recommended rule set
- **CSS/HTML**: Formatting disabled (handled by other tools if needed)
- **VCS Integration**: Enabled to respect `.gitignore`

You can view Biome's defaults at: <https://biomejs.dev/reference/configuration/>

### Vite (`vite.config.mjs`)

- **React Plugin**: Fast Refresh enabled by default
- **Path Resolution**: Automatically resolves TypeScript paths
- **Testing**: Configured with jsdom environment and Storybook test support

### React Query (`App.tsx`)

Minimal configuration for good developer experience:

```typescript
{
  queries: {
    staleTime: 60 * 1000,      // 1 minute - prevents excessive refetching
    gcTime: 5 * 60 * 1000,     // 5 minutes - cache cleanup time
  }
}
```

### Mantine

- **Theme**: Minimal override in `src/utils/theme.ts` - ready for your customisations
- **Colour Scheme**: Set to `auto` by default (respects system preference)
- **CSS**: Uses Mantine's PostCSS preset for optimal bundle size

## Best Practices & Patterns

This template demonstrates several recommended patterns without being overly prescriptive:

### State Management

- **React Query** for server state (data fetching, caching, synchronisation)
- **React Context** for application state (see `DemoProvider` example)
- **Local State** with `useState` for component-specific state

### Code Organisation

- **Feature-based** folders (components, hooks, services) grouped by concern
- **Colocation** of related files (components with their tests and stories)
- **Separation** of concerns (services, models, contexts)

### Type Safety

- **Strict TypeScript** configuration catches potential issues early
- **Type definitions** for all data models
- **Inference** where possible to reduce boilerplate

### Testing Strategy

- **Unit Tests** for components and utilities (`*.test.tsx`)
- **Component Tests** via Storybook integration
- **Test Utilities** that mirror production providers

### React Query Patterns

The `DemoProvider` demonstrates:

- Custom hooks wrapping `useQuery` for reusability
- Proper mutation handling with `onSettled` for cache invalidation
- Error and loading state management
- Context pattern for sharing queries across components

### Component Development

- **Storybook** for isolated component development
- **Props interfaces** for clear component APIs
- **CSS Modules** support for scoped styling (optional)

## Continuous Integration

This template includes a GitHub Actions workflow (`.github/workflows/test.yml`) that automatically runs on:

- **Pushes** to `main`, `staging`, and `development` branches
- **All pull requests**

### What the CI Pipeline Does

1. **Checkout** – Clones the repository
2. **Setup Node.js** – Installs the Node.js version specified in `.nvmrc` with npm caching
3. **Install dependencies** – Runs `npm ci` for clean, reproducible installs
4. **Cache Vite build** – Restores/saves Vite build cache for faster builds
5. **Type check** – Runs TypeScript type checking
6. **Lint** – Runs Biome linting checks
7. **Test** – Runs Vitest unit tests
8. **Build** – Creates a production build
9. **Upload artifacts** – Saves the build output for 7 days

### Caching

The workflow includes caching for:

- **npm dependencies** – Cached based on `package-lock.json`
- **Vite build cache** – Cached for faster subsequent builds

### Customising the Workflow

To modify the CI pipeline, edit `.github/workflows/test.yml`. Common customisations:

- Add additional branches to the push trigger
- Add deployment steps after the build
- Include Storybook build in the pipeline
- Add code coverage reporting

## Customising This Template

### Quick Start Customisation

1. **Update project metadata**:
   - Change `name` in `package.json`
   - Update `<title>` in `index.html`
   - Modify README.md with your project details

2. **Configure theme**:
   - Edit `src/utils/theme.ts` to customise Mantine theme
   - Add custom colours, fonts, spacing, etc.

3. **Remove demo code** (optional):
   - Delete `src/providers/DemoProvider.tsx` and `src/providers/UserProvider.tsx`
   - Delete `src/contexts/DemoContext.tsx` and `src/contexts/UserContext.tsx`
   - Delete `src/hooks/useDemo*.ts` and `src/hooks/useUser*.ts`
   - Delete `src/services/demo*` and `src/services/user*`
   - Delete `src/pages/Demo*.page.tsx` and `src/pages/Users.page.tsx`
   - Delete `src/components/DemoTableCard/` and `src/components/UserCard/`
   - Update `src/Router.tsx` to remove demo routes

4. **Add your features**:
   - Create new pages in `src/pages/`
   - Add routes in `src/Router.tsx`
   - Build components in `src/components/`
   - Add API services in `src/services/`

### Advanced Customisation

#### Adding Environment Variables

1. Create `.env` file (gitignored by default):

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

2. Access in code:

   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

3. Add types in `src/vite-env.d.ts`:

   ```typescript
   interface ImportMetaEnv {
     readonly VITE_API_URL: string
   }
   ```

#### Customising Biome Rules

Add specific rule overrides to `biome.json`:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  }
}
```

#### Adding More Path Aliases

Update `tsconfig.json` and ensure `vite-tsconfig-paths` handles them:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"]
    }
  }
}
```

## Troubleshooting

### Common Issues

#### Build Errors After Installing Dependencies

**Problem**: TypeScript or build errors after `npm install`

**Solution**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild TypeScript
npm run typecheck
```

#### Port Already in Use

**Problem**: `Error: Port 5173 is already in use`

**Solution**:

```bash
# Use a different port
npm run dev -- --port 3000
```

#### Biome Formatting Issues

**Problem**: Files showing formatting errors in editor

**Solution**:

```bash
# Auto-fix all formatting issues
npm run lint:fix

# Ensure .editorconfig is respected by your editor
# VSCode: Install "EditorConfig for VS Code" extension
```

#### React Query DevTools Not Appearing

**Problem**: DevTools icon not visible in development

**Solution**: The DevTools are included in `App.tsx` and should appear in the bottom-left corner. Check:

- You're running in development mode (`npm run dev`, not `npm run preview`)
- Browser window is wide enough (DevTools might be collapsed)
- Try clicking the bottom-left corner to expand

#### Storybook Build Fails

**Problem**: `npm run storybook:build` fails

**Solution**:

```bash
# Clear Storybook cache
rm -rf storybook-static
npm run storybook:build
```

#### TypeScript Path Aliases Not Resolving

**Problem**: Import errors for `@/*` paths

**Solution**:

- Ensure `vite-tsconfig-paths` is installed
- Check `tsconfig.json` has correct path mappings
- Restart TypeScript server in your editor
- For tests: Ensure `vite.config.mjs` includes `tsconfigPaths()` plugin

#### Test Failures After Updating Dependencies

**Problem**: Tests fail after updating React or Mantine

**Solution**:

```bash
# Update test snapshots if needed
npm run vitest -- -u

# Check for breaking changes in release notes
# Update test utilities in src/utils/test/ if needed
```

### Getting Help

- **Mantine Issues**: [Mantine Documentation](https://mantine.dev/) | [Discord](https://discord.gg/mantine)
- **Vite Issues**: [Vite Documentation](https://vite.dev/) | [GitHub Discussions](https://github.com/vitejs/vite/discussions)
- **React Query**: [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- **Biome**: [Biome Documentation](https://biomejs.dev/)

## Licence

This template is free to use for any purpose.

## Acknowledgements

Inspired by and based on the [Mantine Vite Template](https://github.com/mantinedev/vite-template).

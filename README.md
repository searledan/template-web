# Mantine Vite Template

A modern React application template built with Vite, Mantine UI, and TypeScript. This template is designed to be a solid starting point for future projects, featuring a complete development setup with testing, linting, and component documentation.

Inspired by the [official Mantine Vite template](https://github.com/mantinedev/vite-template/tree/master/src).

## Features

This template includes the following technologies and tools:

- **[Vite](https://vite.dev/)** – Lightning-fast build tool and development server
- **[React 19](https://react.dev/)** – Latest version of React
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe development
- **[Mantine UI](https://mantine.dev/)** – Comprehensive React component library
- **[React Router](https://reactrouter.com/)** – Client-side routing
- **[PostCSS](https://postcss.org/)** with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset) – Enhanced styling capabilities
- **[Biome](https://biomejs.dev/)** – Fast linter and formatter (replaces ESLint & Prettier)
- **[Vitest](https://vitest.dev/)** – Unit testing framework with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- **[Storybook](https://storybook.js.org/)** – Component development and documentation

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

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
- `npm run test` – Run full test suite (typecheck + lint + vitest + build)

### Storybook Scripts

- `npm run storybook` – Start Storybook development server on port 6006
- `npm run storybook:build` – Build production Storybook bundle to `storybook-static`

## Project Structure

```
├── .storybook/          # Storybook configuration
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── App.tsx         # Main application component
│   ├── Router.tsx      # React Router configuration
│   ├── main.tsx        # Application entry point
│   └── theme.ts        # Mantine theme configuration
├── test-utils/         # Testing utilities and setup
├── public/             # Static assets
└── index.html          # HTML template
```

## Customising This Template

1. Update `package.json` with your project name and details
2. Modify `src/theme.ts` to customise the Mantine theme
3. Update or remove example components in `src/components/`
4. Configure routing in `src/Router.tsx`
5. Add your own components, pages, and functionality

## Licence

This template is free to use for any purpose.

## Acknowledgements

Inspired by and based on the [Mantine Vite Template](https://github.com/mantinedev/vite-template).

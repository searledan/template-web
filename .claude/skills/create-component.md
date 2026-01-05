---
description: Create a new React component following the template's patterns and best practices. Includes component file, tests, Storybook story, and optional CSS Module.
---

# Create Component Skill

When the user asks to "create a component" or "add a new component", use this skill to ensure consistency with the template's established patterns.

## Component Creation Checklist

Create the following files in `src/components/[ComponentName]/`:

1. **[ComponentName].tsx** - Main component file
2. **[ComponentName].test.tsx** - Test file
3. **[ComponentName].stories.tsx** - Storybook story
4. **[ComponentName].module.css** - CSS Module (optional, only if custom styling needed)

## Component Template Pattern

### 1. Component File ([ComponentName].tsx)

```typescript
import { /* Mantine components */ } from "@mantine/core";
import classes from "./[ComponentName].module.css"; // Only if using CSS Module

export interface [ComponentName]Props {
	/** Description of prop */
	propName?: string;
	/** Another prop */
	onAction?: () => void;
	// Add other props as needed
}

/**
 * Brief description of what this component does.
 *
 * @example
 * ```tsx
 * <ComponentName propName="value" />
 * ```
 */
export const [ComponentName] = ({
	propName = "default",
	onAction,
}: [ComponentName]Props) => {
	// Component logic here

	return (
		<div>
			{/* Component JSX */}
		</div>
	);
};
```

**Key Patterns:**
- ✅ Named export only (no default export)
- ✅ TypeScript interface for props with JSDoc comments
- ✅ Default values in destructuring
- ✅ Optional JSDoc for complex components
- ✅ Import CSS Module only if needed

### 2. Test File ([ComponentName].test.tsx)

```typescript
import { render, screen } from "@/utils/test";
import { [ComponentName] } from "./[ComponentName]";

describe("[ComponentName] component", () => {
	it("renders correctly", () => {
		render(<[ComponentName] propName="test" />);
		expect(screen.getByText("test")).toBeInTheDocument();
	});

	it("handles user interaction", () => {
		const mockFn = vi.fn();
		render(<[ComponentName] onAction={mockFn} />);

		// Simulate interaction
		// fireEvent.click(screen.getByRole("button"));

		// Assert
		// expect(mockFn).toHaveBeenCalled();
	});

	// Add more tests for:
	// - Different prop combinations
	// - Error states
	// - Loading states
	// - Edge cases
});
```

**Key Patterns:**
- ✅ Use custom `render` from `@/utils/test` (includes providers)
- ✅ Use `screen` queries from Testing Library
- ✅ Use `vi.fn()` for mock functions (Vitest)
- ✅ Test component behavior, not implementation
- ✅ Multiple test cases for different scenarios

### 3. Storybook Story ([ComponentName].stories.tsx)

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { [ComponentName] } from "./[ComponentName]";

const meta = {
	title: "Components/[ComponentName]",
	component: [ComponentName],
	parameters: {
		layout: "centered", // or "padded" or "fullscreen"
	},
	tags: ["autodocs"],
	argTypes: {
		propName: {
			control: { type: "text" },
			description: "Description of the prop",
		},
		// Define controls for all props
	},
	// Optional: Add interaction test
	play: async ({ canvas }) => {
		// Test interactions
		// const button = canvas.getByRole("button");
		// await expect(button).toBeInTheDocument();
	},
} satisfies Meta<typeof [ComponentName]>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		propName: "Default value",
	},
};

export const Alternative: Story = {
	args: {
		propName: "Alternative value",
	},
};

// Add more story variants:
// - WithError
// - Loading
// - Empty
// - Interactive
```

**Key Patterns:**
- ✅ Use TypeScript types from Storybook
- ✅ Enable autodocs with `tags: ["autodocs"]`
- ✅ Define argTypes for interactive controls
- ✅ Multiple story variants showing different states
- ✅ Optional `play` function for interaction tests
- ✅ Use `satisfies Meta` for type safety

### 4. CSS Module ([ComponentName].module.css) - Optional

```css
.container {
	/* Use Mantine CSS variables */
	padding: var(--mantine-spacing-md);
	background-color: light-dark(
		var(--mantine-color-white),
		var(--mantine-color-dark-6)
	);
}

.title {
	font-size: rem(24px);
	font-weight: 600;

	@media (max-width: $mantine-breakpoint-md) {
		font-size: rem(18px);
	}
}

/* Use Mantine's light-dark() function for theme support */
/* Use rem() function for responsive sizing */
/* Use Mantine breakpoint variables */
```

**When to Use CSS Modules:**
- Complex custom styling not achievable with Mantine props
- Responsive designs with media queries
- Animations and transitions
- Hover/focus states that need CSS

**When NOT to Use CSS Modules:**
- Simple spacing/colors (use Mantine props instead)
- Standard layouts (use Mantine's Stack, Group, Grid, etc.)

## Workflow

1. **Understand Requirements**: Ask user about:
   - Component purpose and functionality
   - Required props and their types
   - Whether it needs custom styling (CSS Module)
   - Special states (loading, error, empty, etc.)

2. **Create Component Files**:
   - Start with the main component file
   - Add TypeScript interface with all required props
   - Implement component logic
   - Use Mantine components where possible

3. **Write Tests**:
   - At minimum, test that component renders
   - Test prop variations
   - Test user interactions if applicable
   - Test error/edge cases

4. **Create Storybook Story**:
   - Add meta configuration with autodocs
   - Create Default story
   - Add 2-3 variant stories showing different states
   - Add argTypes for all controllable props

5. **Verify Quality**:
   ```bash
   npm run typecheck  # Check TypeScript
   npm run lint       # Check code quality
   npm run vitest     # Run tests
   npm run storybook  # View in Storybook
   ```

## Examples to Reference

- **Simple Component**: `src/components/ColorSchemeToggle/` (no CSS Module)
- **Complex Component**: `src/components/Welcome/` (with CSS Module)

## Common Mantine Patterns

```typescript
// Use Mantine spacing props instead of CSS
<Box p="md" m="lg" />

// Use Mantine color props
<Text c="blue" />
<Button color="red" />

// Use Mantine responsive props
<Title order={1} size="h2" />

// Use Mantine layout components
<Stack gap="md">  // vertical
<Group justify="space-between">  // horizontal
<Grid>  // responsive grid

// Use Mantine hooks
const { colorScheme } = useMantineColorScheme();
const theme = useMantineTheme();
const viewport = useViewportSize();
```

## Anti-Patterns to Avoid

❌ Default exports
❌ Prop drilling (use Context if needed)
❌ Inline styles (use Mantine props or CSS Modules)
❌ Any types (always type props properly)
❌ Missing tests
❌ Missing Storybook stories
❌ Console.logs in production code
❌ Hardcoded colors (use Mantine theme)

## After Creation

1. **Export from Directory**: Add to `index.ts` if using barrel exports
2. **Update Documentation**: Add to CLAUDE.md if it's a pattern others should follow
3. **Test Integration**: Use component in a page to verify it works with providers
4. **Review**: Ensure it follows all template patterns

## Questions to Ask User

Before creating the component, clarify:
- What is the component's purpose?
- What props does it need?
- Does it need to handle loading/error states?
- Does it need custom styling or Mantine components enough?
- Should it be interactive (forms, buttons, etc.)?
- Any specific Mantine components to use?

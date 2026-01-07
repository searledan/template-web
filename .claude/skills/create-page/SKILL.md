---
description: Create a new page component following the template's routing patterns and best practices. Includes page file, route configuration, and proper state handling.
---

# Create Page Skill

When the user asks to "create a page" or "add a new route", use this skill to ensure consistency with the template's established patterns.

## Page Creation Checklist

1. **Create page file** in `src/pages/[PageName].page.tsx`
2. **Update Router** in `src/Router.tsx` with new route
3. **Optional**: Create page test file `[PageName].page.test.tsx`
4. **Optional**: Add navigation links if needed

## Page Template Pattern

### 1. Page File ([PageName].page.tsx)

```typescript
import { /* Mantine components */ } from "@mantine/core";
import { /* custom hooks */ } from "@/hooks/useDataHook";

/**
 * [PageName] page component
 *
 * Purpose: Brief description of what this page displays/does
 */
export const [PageName]Page = () => {
	// Fetch data if needed
	const { data, isPending, isError } = useDataHook();

	// Handle loading state
	if (isPending) {
		return (
			<Text py="lg" px="xl">
				Loading...
			</Text>
		);
	}

	// Handle error state
	if (isError) {
		return (
			<Text py="lg" px="xl" c="red">
				Error loading data. Please try again.
			</Text>
		);
	}

	// Handle empty state
	if (!data || data.length === 0) {
		return (
			<Text py="lg" px="xl">
				No data to display.
			</Text>
		);
	}

	// Main content
	return (
		<div>
			{/* Page content */}
		</div>
	);
};
```

**Key Patterns:**
- ✅ Named export with `Page` suffix (e.g., `HomePage`, `AboutPage`)
- ✅ File name ends with `.page.tsx`
- ✅ Clear loading/error/empty states before main content
- ✅ Use custom hooks for data fetching
- ✅ Use Mantine components for UI
- ✅ Optional JSDoc comment explaining page purpose

### 2. Router Configuration (src/Router.tsx)

Add the new route to the router configuration:

```typescript
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/Layout";
import { HomePage } from "@/pages/Home.page";
import { [PageName]Page } from "@/pages/[PageName].page";

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{ index: true, Component: HomePage },
			{ path: "page-path", Component: [PageName]Page },
		],
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};
```

**Routing Patterns:**

#### Index Route (Home Page)
```typescript
{ index: true, Component: HomePage }
```

#### Simple Route
```typescript
{ path: "about", Component: AboutPage }
```

#### Route with Parameter
```typescript
{ path: "users/:id", Component: UserDetailPage }
```

#### Nested Routes
```typescript
{
	path: "products",
	children: [
		{ index: true, Component: ProductsListPage },
		{ path: ":id", Component: ProductDetailPage },
	],
}
```

#### Route with Layout
```typescript
{
	Component: Layout,
	children: [
		{ path: "dashboard", Component: DashboardPage },
	],
}
```

### 3. Page with Route Parameters

```typescript
import { useParams } from "react-router-dom";

export const UserDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data: user, isPending, isError } = useUserById(Number(id));

	if (isPending) return <Text>Loading user...</Text>;
	if (isError || !user) return <Text c="red">User not found.</Text>;

	return (
		<div>
			<Title>User: {user.name}</Title>
			{/* User details */}
		</div>
	);
};
```

**Key Patterns:**
- ✅ Use `useParams` hook from react-router-dom
- ✅ Type the params with TypeScript
- ✅ Convert params to correct type (e.g., Number() for IDs)
- ✅ Handle not found case

### 4. Page Test File ([PageName].page.test.tsx) - Optional

```typescript
import { render, screen } from "@/utils/test";
import { [PageName]Page } from "./[PageName].page";

describe("[PageName]Page", () => {
	it("renders page content", () => {
		render(<[PageName]Page />);
		expect(screen.getByText("Expected content")).toBeInTheDocument();
	});

	it("displays loading state", () => {
		// Mock loading state
		render(<[PageName]Page />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("displays error state", () => {
		// Mock error state
		render(<[PageName]Page />);
		expect(screen.getByText(/error/i)).toBeInTheDocument();
	});
});
```

**When to Test Pages:**
- Complex logic in the page
- Critical user flows (checkout, authentication, etc.)
- Pages with forms or complex interactions

**When NOT to Test Pages:**
- Simple pages that just display data
- Pages that only compose components (test those components instead)

### 5. Navigation Links

Add navigation to the page in relevant components:

```typescript
import { Link } from "react-router-dom";

// Using Link component
<Link to="/page-path">Go to Page</Link>

// Using Button with Link
<Button component={Link} to="/page-path">
	Navigate
</Button>

// Using Anchor (Mantine)
<Anchor component={Link} to="/page-path">
	Click here
</Anchor>
```

## Common Page Patterns

### List/Index Page

```typescript
export const ProductsPage = () => {
	const { data: products, isPending, isError } = useProducts();

	if (isPending) return <Text>Loading products...</Text>;
	if (isError) return <Text c="red">Failed to load products.</Text>;
	if (!products || products.length === 0) {
		return <Text>No products available.</Text>;
	}

	return (
		<Stack gap="md">
			<Title>Products</Title>
			<Grid>
				{products.map((product) => (
					<Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 4 }}>
						<ProductCard product={product} />
					</Grid.Col>
				))}
			</Grid>
		</Stack>
	);
};
```

### Detail Page

```typescript
export const ProductDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data: product, isPending, isError } = useProductById(Number(id));

	if (isPending) return <Loader />;
	if (isError || !product) {
		return (
			<Stack align="center" gap="md">
				<Text c="red">Product not found</Text>
				<Button component={Link} to="/products">
					Back to Products
				</Button>
			</Stack>
		);
	}

	return (
		<Stack>
			<Button component={Link} to="/products" variant="subtle">
				← Back
			</Button>
			<Title>{product.name}</Title>
			<Text>{product.description}</Text>
			{/* Product details */}
		</Stack>
	);
};
```

### Form Page

```typescript
import { useForm } from "@mantine/form";

export const CreateUserPage = () => {
	const navigate = useNavigate();
	const createMutation = useCreateUser();

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
		},
		validate: {
			name: (value) => (value.length < 2 ? "Name too short" : null),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	const handleSubmit = async (values: typeof form.values) => {
		try {
			await createMutation.mutateAsync(values);
			navigate("/users");
		} catch (error) {
			// Handle error
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="md">
				<Title>Create User</Title>
				<TextInput
					label="Name"
					{...form.getInputProps("name")}
				/>
				<TextInput
					label="Email"
					type="email"
					{...form.getInputProps("email")}
				/>
				<Group>
					<Button type="submit" loading={createMutation.isPending}>
						Create
					</Button>
					<Button
						variant="subtle"
						component={Link}
						to="/users"
					>
						Cancel
					</Button>
				</Group>
			</Stack>
		</form>
	);
};
```

## Workflow

1. **Understand Requirements**: Ask user about:
   - Page purpose and content
   - URL path for the route
   - Does it need route parameters?
   - Does it fetch data?
   - Does it need forms or complex interactions?

2. **Create Page File**:
   - Create in `src/pages/[PageName].page.tsx`
   - Add proper loading/error/empty states
   - Use custom hooks for data fetching

3. **Update Router**:
   - Add route to `src/Router.tsx`
   - Choose correct route pattern (index, simple, params, nested)
   - Ensure route path makes sense

4. **Add Navigation** (if needed):
   - Add links to header/nav components
   - Add back buttons on detail pages
   - Use `Link` component from react-router-dom

5. **Test** (optional but recommended):
   - Create test file if page has complex logic
   - Test loading/error states
   - Test user interactions

6. **Verify**:
   ```bash
   npm run typecheck  # Check TypeScript
   npm run dev        # Test in browser
   npm run lint       # Check code quality
   ```

## Examples to Reference

- **Simple Page**: `src/pages/Home.page.tsx`
- **List Page**: `src/pages/Demo.page.tsx`
- **Detail Page**: `src/pages/DemoId.page.tsx`

## State Management in Pages

### Using React Query

```typescript
// Good: Use custom hook that wraps useQuery
const { data, isPending, isError } = useUsers();

// Also Good: Use useQuery directly if simple
const { data, isPending, isError } = useQuery({
	queryKey: ["users"],
	queryFn: fetchUsers,
});
```

### Using Context

```typescript
// Good: Use custom hook that consumes context
const { user, logout } = useAuth();
```

### Using Local State

```typescript
// Good: For UI state only
const [isOpen, setIsOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState(0);
```

## Common Mantine Page Layouts

```typescript
// Centered content
<Container size="sm">
	<Stack gap="lg">
		{/* Content */}
	</Stack>
</Container>

// Full width with padding
<Box p="xl">
	{/* Content */}
</Box>

// Two column layout
<Grid>
	<Grid.Col span={{ base: 12, md: 8 }}>
		{/* Main content */}
	</Grid.Col>
	<Grid.Col span={{ base: 12, md: 4 }}>
		{/* Sidebar */}
	</Grid.Col>
</Grid>

// With header
<Stack gap={0}>
	<Box bg="gray.1" p="md">
		<Title>Page Header</Title>
	</Box>
	<Box p="md">
		{/* Content */}
	</Box>
</Stack>
```

## Anti-Patterns to Avoid

❌ Fetching data in page without proper loading states
❌ Not handling errors
❌ Using default exports
❌ Hardcoding API URLs (use service layer)
❌ Complex business logic in pages (move to hooks/services)
❌ Not using TypeScript for route params
❌ Missing navigation back to parent routes
❌ Not using Mantine layout components

## After Creation

1. **Test Navigation**: Navigate to the page in browser
2. **Test States**: Verify loading, error, empty, and success states
3. **Test Responsiveness**: Check mobile and desktop views
4. **Update CLAUDE.md**: If the page introduces new patterns

## Questions to Ask User

Before creating the page, clarify:
- What is the page's purpose?
- What URL path should it have?
- Does it need route parameters (e.g., /users/:id)?
- Does it fetch data? What data?
- Does it need forms or user input?
- Should it be behind authentication?
- Where should users navigate to reach it?
- Does it need breadcrumbs or back navigation?

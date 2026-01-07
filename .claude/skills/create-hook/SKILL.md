---
description: Create a custom React hook following the template's patterns. Includes hook file, tests, and proper TypeScript typing.
---

# Create Hook Skill

When the user asks to "create a hook" or "add a custom hook", use this skill to ensure consistency with the template's established patterns.

## Hook Creation Checklist

1. **Create hook file** in `src/hooks/use[HookName].ts`
2. **Add TypeScript types** for parameters and return values
3. **Create test file** `use[HookName].test.ts` (for complex hooks)
4. **Add JSDoc comments** explaining the hook's purpose
5. **Export from hooks directory** if using barrel exports

## Hook Naming Convention

- ✅ Always prefix with `use` (e.g., `useDemo`, `useDemoById`, `useLocalStorage`)
- ✅ Use camelCase
- ✅ Be descriptive and specific

## Hook Template Patterns

### 1. React Query Hook (Most Common)

```typescript
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchResource } from "@/services/resourceService";
import type { Resource } from "@/models/Resource";

/**
 * Hook to fetch resource data from the API.
 *
 * Use this when you need to:
 * - Fetch the latest resource data
 * - Automatically cache and revalidate data
 * - Handle loading and error states
 *
 * @param id - The resource ID to fetch (optional)
 * @returns React Query result with resource data
 *
 * @example
 * ```tsx
 * const ResourceComponent = ({ id }: { id: number }) => {
 *   const { data, isPending, isError } = useResource(id);
 *
 *   if (isPending) return <Loader />;
 *   if (isError) return <ErrorMessage />;
 *
 *   return <div>{data.name}</div>;
 * };
 * ```
 */
export const useResource = (
	id?: number
): UseQueryResult<Resource | Resource[], Error> => {
	return useQuery({
		queryKey: id ? ["resource", id] : ["resources"],
		queryFn: () => (id ? fetchResource(id) : fetchAllResources()),
		enabled: !!id, // Only run if id is provided
		staleTime: 30000, // 30 seconds
	});
};
```

**Key Patterns:**
- ✅ Import React Query types for return type
- ✅ Import types from models
- ✅ Comprehensive JSDoc with examples
- ✅ Type parameters and return value
- ✅ Use descriptive query keys
- ✅ Use `enabled` option for conditional queries

### 2. Context Consumer Hook

```typescript
import { use } from "react";
import { ResourceContext } from "@/contexts/ResourceContext";

/**
 * Hook to consume ResourceContext.
 *
 * Must be used within a ResourceProvider.
 *
 * @throws Error if used outside ResourceProvider
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { resources, updateResource } = useResource();
 *   return <div>{resources.length} items</div>;
 * };
 * ```
 */
export const useResource = () => {
	const context = use(ResourceContext);

	if (context === undefined) {
		throw new Error("useResource must be used within ResourceProvider");
	}

	return context;
};
```

**Key Patterns:**
- ✅ Use React 19's `use` hook for Context
- ✅ Throw descriptive error if used outside provider
- ✅ Simple and focused
- ✅ Clear error messages

### 3. State Management Hook

```typescript
import { useState, useCallback } from "react";

interface UseToggleReturn {
	value: boolean;
	toggle: () => void;
	setTrue: () => void;
	setFalse: () => void;
	setValue: (value: boolean) => void;
}

/**
 * Hook to manage boolean toggle state with utility functions.
 *
 * @param initialValue - Initial boolean value (default: false)
 * @returns Object with value and control functions
 *
 * @example
 * ```tsx
 * const Modal = () => {
 *   const { value: isOpen, toggle, setTrue, setFalse } = useToggle();
 *
 *   return (
 *     <>
 *       <Button onClick={setTrue}>Open Modal</Button>
 *       <Modal opened={isOpen} onClose={setFalse} />
 *     </>
 *   );
 * };
 * ```
 */
export const useToggle = (initialValue = false): UseToggleReturn => {
	const [value, setValue] = useState(initialValue);

	const toggle = useCallback(() => setValue((prev) => !prev), []);
	const setTrue = useCallback(() => setValue(true), []);
	const setFalse = useCallback(() => setValue(false), []);

	return { value, toggle, setTrue, setFalse, setValue };
};
```

**Key Patterns:**
- ✅ Define return type interface
- ✅ Use `useCallback` for memoized functions
- ✅ Provide default parameters
- ✅ Return object for named destructuring

### 4. Effect Hook (Side Effects)

```typescript
import { useEffect } from "react";

/**
 * Hook to update document title.
 *
 * @param title - The title to set
 * @param restoreOnUnmount - Whether to restore previous title (default: true)
 *
 * @example
 * ```tsx
 * const UserPage = ({ user }: { user: User }) => {
 *   useDocumentTitle(`User: ${user.name}`);
 *   return <div>{user.name}</div>;
 * };
 * ```
 */
export const useDocumentTitle = (
	title: string,
	restoreOnUnmount = true
): void => {
	useEffect(() => {
		const previousTitle = document.title;
		document.title = title;

		if (restoreOnUnmount) {
			return () => {
				document.title = previousTitle;
			};
		}
	}, [title, restoreOnUnmount]);
};
```

**Key Patterns:**
- ✅ Use `useEffect` for side effects
- ✅ Clean up in return function
- ✅ Include all dependencies
- ✅ Return `void` for effect hooks

### 5. Derived State Hook

```typescript
import { useMemo } from "react";

interface UseFilteredListOptions<T> {
	items: T[];
	filterFn: (item: T) => boolean;
	sortFn?: (a: T, b: T) => number;
}

/**
 * Hook to filter and sort a list with memoization.
 *
 * @param options - Configuration object
 * @returns Filtered and sorted list
 *
 * @example
 * ```tsx
 * const UserList = ({ users }: { users: User[] }) => {
 *   const activeUsers = useFilteredList({
 *     items: users,
 *     filterFn: (user) => user.active,
 *     sortFn: (a, b) => a.name.localeCompare(b.name),
 *   });
 *
 *   return <>{activeUsers.map(...)}</>;
 * };
 * ```
 */
export const useFilteredList = <T,>({
	items,
	filterFn,
	sortFn,
}: UseFilteredListOptions<T>): T[] => {
	return useMemo(() => {
		const filtered = items.filter(filterFn);
		return sortFn ? filtered.sort(sortFn) : filtered;
	}, [items, filterFn, sortFn]);
};
```

**Key Patterns:**
- ✅ Use `useMemo` for expensive computations
- ✅ Generic types for reusability
- ✅ Include all dependencies in dependency array
- ✅ Options object for multiple parameters

### 6. Form Hook (with Mantine)

```typescript
import { useForm, UseFormReturnType } from "@mantine/form";

interface LoginFormValues {
	email: string;
	password: string;
	remember: boolean;
}

/**
 * Hook for login form state and validation.
 *
 * @returns Mantine form instance for login
 *
 * @example
 * ```tsx
 * const LoginPage = () => {
 *   const form = useLoginForm();
 *
 *   return (
 *     <form onSubmit={form.onSubmit(handleSubmit)}>
 *       <TextInput {...form.getInputProps("email")} />
 *       <PasswordInput {...form.getInputProps("password")} />
 *       <Checkbox {...form.getInputProps("remember")} />
 *     </form>
 *   );
 * };
 * ```
 */
export const useLoginForm = (): UseFormReturnType<LoginFormValues> => {
	return useForm<LoginFormValues>({
		initialValues: {
			email: "",
			password: "",
			remember: false,
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email address",
			password: (value) =>
				value.length >= 6 ? null : "Password must be at least 6 characters",
		},
	});
};
```

**Key Patterns:**
- ✅ Define form values interface
- ✅ Type the return value with `UseFormReturnType`
- ✅ Include validation rules
- ✅ Set sensible initial values

## Hook Testing

### Testing React Query Hooks

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useResource } from "./useResource";

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

describe("useResource", () => {
	it("fetches resource data", async () => {
		const { result } = renderHook(() => useResource(1), {
			wrapper: createWrapper(),
		});

		expect(result.current.isPending).toBe(true);

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toBeDefined();
	});
});
```

### Testing State Hooks

```typescript
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
	it("toggles value", () => {
		const { result } = renderHook(() => useToggle(false));

		expect(result.current.value).toBe(false);

		act(() => {
			result.current.toggle();
		});

		expect(result.current.value).toBe(true);
	});

	it("sets true", () => {
		const { result } = renderHook(() => useToggle(false));

		act(() => {
			result.current.setTrue();
		});

		expect(result.current.value).toBe(true);
	});
});
```

## Common Hook Patterns

### Debounced Value

```typescript
import { useState, useEffect } from "react";

export const useDebounce = <T,>(value: T, delay = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
```

### Local Storage

```typescript
import { useState, useEffect } from "react";

export const useLocalStorage = <T,>(
	key: string,
	initialValue: T
): [T, (value: T) => void] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value: T) => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
};
```

### Media Query

```typescript
import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		setMatches(media.matches);

		const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
		media.addEventListener("change", listener);

		return () => media.removeEventListener("change", listener);
	}, [query]);

	return matches;
};
```

## Workflow

1. **Understand Requirements**: Ask user about:
   - Hook's purpose and use case
   - What data/state it manages
   - Parameters it needs
   - What it returns
   - Dependencies (React Query, Context, etc.)

2. **Choose Pattern**:
   - React Query hook for data fetching
   - Context consumer for shared state
   - State management for UI state
   - Effect hook for side effects
   - Derived state for computations

3. **Create Hook File**:
   - Name it `use[HookName].ts`
   - Add comprehensive JSDoc
   - Type all parameters and returns
   - Add examples in JSDoc

4. **Add Tests** (for complex hooks):
   - Use `renderHook` from Testing Library
   - Test with appropriate wrappers
   - Test all return values and functions
   - Test edge cases

5. **Verify**:
   ```bash
   npm run typecheck  # Check types
   npm run lint       # Check code quality
   npm run vitest     # Run tests
   ```

## Examples to Reference

- **React Query Hook**: `src/hooks/useDemoById.ts`
- **Context Hook**: `src/hooks/useDemo.ts`

## Anti-Patterns to Avoid

❌ Not prefixing with `use`
❌ Using `any` types
❌ Missing JSDoc documentation
❌ Not handling errors in React Query hooks
❌ Forgetting cleanup in useEffect
❌ Missing dependencies in dependency arrays
❌ Overcomplicating simple hooks
❌ Not memoizing callback functions

## After Creation

1. **Use in Component**: Test the hook in an actual component
2. **Check Performance**: Ensure no unnecessary re-renders
3. **Document**: Add to CLAUDE.md if it's a pattern to follow
4. **Export**: Add to barrel export if using one

## Questions to Ask User

Before creating the hook, clarify:
- What problem does this hook solve?
- What data does it manage or fetch?
- What parameters does it need?
- What should it return?
- Does it use React Query, Context, or local state?
- Does it need cleanup logic?
- Should it be generic/reusable?

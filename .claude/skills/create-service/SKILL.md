---
description: Create a service and accompanying React Query hook following the project's patterns. Includes service file, hook file, model type, and tests.
---

# Create Service Skill

When the user asks to "create a service", "add an API service", or "add a data layer", use this skill to scaffold a service + hook pair that follows the project's established patterns.

## Service Creation Checklist

1. **Create model type** in `src/models/[ModelName].ts`
2. **Create service file** in `src/services/[modelName]Service.ts`
3. **Create hook file(s)** in `src/hooks/use[ModelName].ts` and/or `src/hooks/use[ModelName]ById.ts`
4. **Create test file** matching the hook filename (e.g. `useProjects.test.ts`, `useProjectById.test.ts`)
5. **Verify** with `npm run typecheck && npm run lint`

## Naming Conventions

| File | Pattern | Example |
|------|---------|---------|
| Model | `src/models/[ModelName].ts` | `src/models/Project.ts` |
| Service | `src/services/[modelName]Service.ts` | `src/services/projectService.ts` |
| List hook | `src/hooks/use[ModelNames].ts` | `src/hooks/useProjects.ts` |
| By-ID hook | `src/hooks/use[ModelName]ById.ts` | `src/hooks/useProjectById.ts` |
| Hook test | Mirrors hook filename + `.test.ts` | `src/hooks/useProjects.test.ts` |

## Service Template

Services export async functions that call the API. **Do not wrap in try/catch** — let errors propagate to React Query.

```typescript
import type { Project } from "@/models/Project";

const API_BASE = "/api/projects";

export const getAllProjects = async (): Promise<Project[]> => {
	const response = await fetch(API_BASE);

	if (!response.ok) throw new Error("Failed to fetch projects");

	return response.json();
};

export const getProjectById = async (id: number): Promise<Project> => {
	const response = await fetch(`${API_BASE}/${id}`);

	if (!response.ok) throw new Error("Failed to fetch project");

	return response.json();
};

export const updateProject = async (id: number, project: Project): Promise<Project> => {
	const response = await fetch(`${API_BASE}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(project),
	});

	if (!response.ok) throw new Error("Failed to update project");

	return response.json();
};

export const deleteProject = async (id: number): Promise<void> => {
	const response = await fetch(`${API_BASE}/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) throw new Error("Failed to delete project");
};
```

**Key Patterns:**
- Export individual async functions (not a class)
- Let errors propagate — no try/catch
- Mutations throw on failure, return the updated entity on success
- Never return booleans from mutations

## Hook Template (List)

```typescript
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/services/projectService";

export const useProjects = () => {
	return useQuery({
		queryKey: ["projects"],
		queryFn: getAllProjects,
	});
};
```

## Hook Template (By ID)

```typescript
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/services/projectService";

/**
 * Hook to fetch a single project by ID.
 *
 * @param id - The project ID to fetch
 * @returns React Query result with project data, loading state, and error state
 *
 * @example
 * ```tsx
 * const { data: project, isPending, isError } = useProjectById(projectId);
 * ```
 */
export const useProjectById = (id: number) => {
	return useQuery({
		queryKey: ["project", id],
		queryFn: () => getProjectById(id),
		enabled: !!id,
	});
};
```

## Model Template

```typescript
export interface Project {
	id: number;
	name: string;
	// Add fields specific to this entity
}
```

## Examples to Reference

- **Service**: `src/services/demoService.ts`, `src/services/userService.ts`
- **By-ID hook (React Query)**: `src/hooks/useDemoById.ts`
- **Context consumer hook**: `src/hooks/useUsers.ts` (different pattern — uses Context, not direct React Query)
- **Model**: `src/models/Demo.ts`, `src/models/User.ts`

## Workflow

1. **Understand Requirements**: Ask user about:
   - What entity/resource this service manages
   - What fields the model needs
   - Which operations are needed (list, get by ID, create, update, delete)
   - The API endpoint base path

2. **Create Files**: Generate the model, service, and hook(s)

3. **Verify**:
   ```bash
   npm run typecheck
   npm run lint
   ```

## Anti-Patterns to Avoid

- Wrapping service calls in try/catch (React Query handles errors)
- Returning booleans from mutations (return the entity or throw)
- Creating a context/provider when a React Query hook suffices
- Adding barrel exports (import directly from files)
- Putting hook logic inside the service file

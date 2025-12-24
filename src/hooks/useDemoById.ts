import { useQuery } from "@tanstack/react-query";
import { getDemoById } from "@/services/demoService";

/**
 * Hook to fetch a single demo by ID from the backend.
 *
 * Use this when you need to:
 * - Fetch the latest version of a specific demo
 * - Load a demo that might not be in the current context
 * - Display demo detail pages with deep linking
 *
 * For filtering demos already loaded in context, use:
 * `const { demos } = useDemo(); const demo = demos?.find(d => d.id === id);`
 *
 * @param id - The demo ID to fetch (string or number)
 * @returns React Query result with demo data, loading state, and error state
 *
 * @example
 * ```tsx
 * const DemoDetailPage = ({ demoId }: { demoId: string }) => {
 *   const { data: demo, isPending, isError } = useDemoById(demoId);
 *
 *   if (isPending) return <Spinner />;
 *   if (isError || !demo) return <ErrorMessage />;
 *
 *   return <DemoDetails demo={demo} />;
 * };
 * ```
 */
export const useDemoById = (id: number) => {
	return useQuery({
		queryKey: ["demo", id],
		queryFn: () => getDemoById(id),
		enabled: !!id,
		staleTime: 30000,
	});
};

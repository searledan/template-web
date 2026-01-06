import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/userService";

/**
 * Hook to fetch a single user by ID from the backend.
 *
 * Use this when you need to:
 * - Fetch the latest version of a specific user
 * - Load a user that might not be in the current context
 * - Display user detail pages with deep linking
 *
 * For filtering users already loaded in context, use:
 * `const { users } = useUsers(); const user = users?.find(u => u.id === id);`
 *
 * @param id - The user ID to fetch (string or number)
 * @returns React Query result with user data, loading state, and error state
 *
 * @example
 * ```tsx
 * const UserDetailPage = ({ userId }: { userId: string }) => {
 *   const { data: user, isPending, isError } = useUserById(userId);
 *
 *   if (isPending) return <Spinner />;
 *   if (isError || !user) return <ErrorMessage />;
 *
 *   return <UserDetails user={user} />;
 * };
 * ```
 */
export const useUserById = (id: number) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: () => getUserById(id),
		enabled: !!id,
		staleTime: 30000,
	});
};

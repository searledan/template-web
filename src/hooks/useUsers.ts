import { use } from "react";
import { UserContext } from "@/contexts/UserContext";

/**
 * Hook to consume UserContext.
 *
 * Provides access to user list data, loading states, and mutation functions.
 *
 * @throws Error if used outside UserProvider
 *
 * @example
 * ```tsx
 * const UsersPage = () => {
 *   const { users, isPending, isError } = useUsers();
 *
 *   if (isPending) return <Loader />;
 *   if (isError) return <ErrorMessage />;
 *
 *   return <div>{users?.map(...)}</div>;
 * };
 * ```
 */
export const useUsers = () => {
	const context = use(UserContext);

	if (context === undefined) {
		throw new Error("useUsers must be used within UserProvider");
	}

	return context;
};

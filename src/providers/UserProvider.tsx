import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { type ReactNode, useMemo } from "react";
import { UserContext } from "@/contexts/UserContext";
import type { User } from "@/models/User";
import { deleteUser, getAllUsers, updateUser } from "@/services/userService";

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient();
	const queryKey = ["users"];

	const { isPending, isError, data } = useQuery({
		queryKey: queryKey,
		queryFn: async () => await getAllUsers(),
		placeholderData: keepPreviousData,
		staleTime: 30000,
	});

	const updateMutation = useMutation({
		mutationFn: async ({ id, user }: { id: number; user: User }) =>
			updateUser(id, user),
		onSuccess: () => {
			console.log("User updated successfully");
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onError: () => {
			console.error("Error updating user");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async ({ id }: { id: number }) => deleteUser(id),
		onSuccess: () => {
			console.log("User deleted successfully");
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onError: () => {
			console.error("Error deleting user");
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: Mutations are stable references and shouldn't be in dependencies
	const value = useMemo(
		() => ({
			users: data,
			isPending,
			isError,
			updateMutation,
			deleteMutation,
		}),
		[data, isPending, isError],
	);

	return <UserContext value={value}>{children}</UserContext>;
};

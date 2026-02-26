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
	});

	const updateMutation = useMutation({
		mutationFn: async ({ id, user }: { id: number; user: User }) =>
			updateUser(id, user),
		onSuccess: () => {
			// TODO: Show success notification
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onError: () => {
			// TODO: Show error notification
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async ({ id }: { id: number }) => deleteUser(id),
		onSuccess: () => {
			// TODO: Show success notification
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onError: () => {
			// TODO: Show error notification
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

import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { type ReactNode, useMemo } from "react";
import { DemoContext } from "@/contexts/DemoContext";
import type { Demo } from "@/models/Demo";
import { deleteDemo, getAllDemos, updateDemo } from "@/services/demoService";

export const DemoProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient();
	const queryKey = ["demos"];

	const { isPending, isError, data } = useQuery({
		queryKey: queryKey,
		queryFn: async () => await getAllDemos(),
		placeholderData: keepPreviousData,
		staleTime: 30000,
	});

	const updateMutation = useMutation({
		mutationFn: async ({ id, demo }: { id: number; demo: Demo }) =>
			updateDemo(id, demo),
		onSuccess: () => {
			console.log("Demo updated successfully"); // TODO: remove this, this is just for testing
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onError: () => {
			console.error("Error updating demo"); // TODO: remove this, handled by service
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async ({ id }: { id: number }) => deleteDemo(id),
		onSuccess: () => {
			console.log("Demo deleted successfully"); // TODO: remove this, this is just for testing
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onError: () => {
			console.error("Error deleting demo"); // TODO: remove this, handled by service
		},
	});

	const value = useMemo(
		() => ({
			demos: data,
			isPending,
			isError,
			updateMutation,
			deleteMutation,
		}),
		[data, isPending, isError, updateMutation, deleteMutation],
	);

	return <DemoContext value={value}>{children}</DemoContext>;
};

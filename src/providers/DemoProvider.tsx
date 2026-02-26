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
	});

	const updateMutation = useMutation({
		mutationFn: async ({ id, demo }: { id: number; demo: Demo }) =>
			updateDemo(id, demo),
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
		mutationFn: async ({ id }: { id: number }) => deleteDemo(id),
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
			demos: data,
			isPending,
			isError,
			updateMutation,
			deleteMutation,
		}),
		[data, isPending, isError],
	);

	return <DemoContext value={value}>{children}</DemoContext>;
};

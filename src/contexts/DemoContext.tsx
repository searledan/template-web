import type { UseMutationResult } from "@tanstack/react-query";
import { createContext } from "react";
import type { Demo } from "@/models/Demo";

interface DemoContextType {
	demos: Demo[] | undefined;
	isPending: boolean;
	isError: boolean;
	updateMutation: UseMutationResult<Demo, Error, { id: number; demo: Demo }>;
	deleteMutation: UseMutationResult<void, Error, { id: number }>;
}

export const DemoContext = createContext<DemoContextType | undefined>(
	undefined,
);

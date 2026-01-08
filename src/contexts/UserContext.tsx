import type { UseMutationResult } from "@tanstack/react-query";
import { createContext } from "react";
import type { User } from "@/models/User";

interface UserContextType {
	users: User[] | undefined;
	isPending: boolean;
	isError: boolean;
	updateMutation: UseMutationResult<boolean, Error, { id: number; user: User }>;
	deleteMutation: UseMutationResult<boolean, Error, { id: number }>;
}

export const UserContext = createContext<UserContextType | undefined>(
	undefined,
);

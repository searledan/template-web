import type { User } from "@/models/User";
import mockUsers from "./users.json";

const userData: User[] = [...mockUsers];

export const getAllUsers = async (): Promise<User[]> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const data: User[] = [...userData];

	return data;
};

export const getUserById = async (id: number): Promise<User | null> => {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const user = userData.find((user) => user.id === id);

	return user ?? null;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const index = userData.findIndex((user) => user.id === id);

	if (index === -1) throw new Error("User not found");

	const existing = userData[index];
	if (!existing) throw new Error("User not found");

	const updated = { ...existing, ...user };
	userData[index] = updated;

	return updated;
};

export const deleteUser = async (id: number): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const index = userData.findIndex((user) => user.id === id);

	if (index === -1) throw new Error("User not found");

	userData.splice(index, 1);
};

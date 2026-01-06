import type { User } from "@/models/User";
import mockUsers from "./users.json";

const userData: User[] = [...mockUsers];

export const getAllUsers = async (): Promise<User[]> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));

		const data: User[] = [...userData];

		return data;
	} catch (error: unknown) {
		console.error("Error fetching users:", error);

		return [];
	}
};

export const getUserById = async (id: number): Promise<User | null> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 300));

		const user = userData.find((user) => user.id === id);

		return user ?? null;
	} catch (error: unknown) {
		console.error("Error fetching user:", error);

		return null;
	}
};

export const updateUser = async (id: number, user: User): Promise<boolean> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 300));

		const index = userData.findIndex((user) => user.id === id);

		if (index === -1) throw new Error("User not found");

		userData[index] = { ...userData[index], ...user };

		return true;
	} catch (error: unknown) {
		console.error("Error updating user:", error);

		return false;
	}
};

export const deleteUser = async (id: number): Promise<boolean> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 300));

		const index = userData.findIndex((user) => user.id === id);

		if (index === -1) throw new Error("User not found");

		userData.splice(index, 1);

		return true;
	} catch (error: unknown) {
		console.error("Error deleting user:", error);

		return false;
	}
};

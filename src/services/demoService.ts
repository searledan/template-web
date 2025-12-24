import type { Demo } from "@/models/Demo";

import mockDemos from "./demos.json";

const demoData: Demo[] = [...mockDemos];

export const getAllDemos = async (): Promise<Demo[]> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 300));

		const data: Demo[] = [...demoData];

		return data;
	} catch (error: unknown) {
		console.error("Error fetching demos:", error);

		return [];
	}
};

export const getDemoById = async (id: number): Promise<Demo | null> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 200));

		const demo = demoData.find((demo) => demo.id === id);

		return demo ?? null;
	} catch (error: unknown) {
		console.error("Error fetching demo:", error);

		return null;
	}
};

export const updateDemo = async (id: number, demo: Demo): Promise<boolean> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 200));

		const index = demoData.findIndex((demo) => demo.id === id);

		if (index === -1) throw new Error("Demo not found");

		demoData[index] = { ...demoData[index], ...demo };

		return true;
	} catch (error: unknown) {
		console.error("Error updating demo:", error);

		return false;
	}
};

export const deleteDemo = async (id: number): Promise<boolean> => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 200));

		const index = demoData.findIndex((demo) => demo.id === id);

		if (index === -1) throw new Error("Demo not found");

		demoData.splice(index, 1);

		return true;
	} catch (error: unknown) {
		console.error("Error deleting demo:", error);

		return false;
	}
};

import type { Demo } from "@/models/Demo";

import mockDemos from "./demos.json";

const demoData: Demo[] = [...mockDemos];

export const getAllDemos = async (): Promise<Demo[]> => {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const data: Demo[] = [...demoData];

	return data;
};

export const getDemoById = async (id: number): Promise<Demo | null> => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	const demo = demoData.find((demo) => demo.id === id);

	return demo ?? null;
};

export const updateDemo = async (id: number, demo: Demo): Promise<Demo> => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	const index = demoData.findIndex((demo) => demo.id === id);

	if (index === -1) throw new Error("Demo not found");

	const existing = demoData[index];
	if (!existing) throw new Error("Demo not found");

	const updated = { ...existing, ...demo };
	demoData[index] = updated;

	return updated;
};

export const deleteDemo = async (id: number): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	const index = demoData.findIndex((demo) => demo.id === id);

	if (index === -1) throw new Error("Demo not found");

	demoData.splice(index, 1);
};

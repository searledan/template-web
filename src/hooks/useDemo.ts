import { use } from "react";
import { DemoContext } from "@/contexts/DemoContext";

export const useDemo = () => {
	const context = use(DemoContext);

	if (context === undefined) {
		throw new Error("useDemo must be used within DemoProvider");
	}

	return context;
};

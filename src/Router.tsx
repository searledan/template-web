import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/Layout";
import { DemoPage } from "@/pages/Demo.page";
import { HomePage } from "@/pages/Home.page";
import { DemoIdPage } from "./pages/DemoId.page";

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [{ index: true, Component: HomePage }],
	},
	{
		path: "demo",
		children: [
			{ index: true, Component: DemoPage },
			{
				path: ":id",
				Component: DemoIdPage,
			},
		],
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};

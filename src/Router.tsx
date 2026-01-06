import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/Layout";
import { DemoPage } from "@/pages/Demo.page";
import { DemoIdPage } from "@/pages/DemoId.page";
import { HomePage } from "@/pages/Home.page";
import { UsersPage } from "@/pages/Users.page";

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{ index: true, Component: HomePage },
			{ path: "users", Component: UsersPage },
		],
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

import { HomePage } from "@pages/Home.page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
]);

export const Router = () => {
	return <RouterProvider router={router} />;
};

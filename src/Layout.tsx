import { Container } from "@mantine/core";
import { Outlet } from "react-router";

export const Layout = () => {
	return (
		<Container size="lg">
			<Outlet />
		</Container>
	);
};

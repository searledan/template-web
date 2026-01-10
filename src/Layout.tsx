import { AppShell, Button, Container, Group, Title } from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";

export const Layout = () => {
	const location = useLocation();

	const isActive = (path: string) => {
		if (path === "/") {
			return location.pathname === "/";
		}
		return location.pathname.startsWith(path);
	};

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between">
					<Button
						component={Link}
						to="/"
						variant="subtle"
						size="compact-md"
						style={{ padding: 0 }}
					>
						<Title order={4}>Template Web</Title>
					</Button>
					<Group gap="xs">
						<Button
							component={Link}
							to="/users"
							variant={isActive("/users") ? "light" : "subtle"}
						>
							Team
						</Button>
						<Button
							component={Link}
							to="/demo"
							variant={isActive("/demo") ? "light" : "subtle"}
						>
							Demos
						</Button>
						<ColorSchemeToggle variant="compact" />
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Main>
				<Container size="lg">
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};

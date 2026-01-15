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
							style={{
								borderBottom: isActive("/users")
									? "2px solid var(--mantine-color-blue-6)"
									: "2px solid transparent",
								borderRadius: isActive("/users") ? "4px 4px 0 0" : undefined,
							}}
						>
							Team
						</Button>
						<Button
							component={Link}
							to="/demo"
							variant={isActive("/demo") ? "light" : "subtle"}
							style={{
								borderBottom: isActive("/demo")
									? "2px solid var(--mantine-color-blue-6)"
									: "2px solid transparent",
								borderRadius: isActive("/demo") ? "4px 4px 0 0" : undefined,
							}}
						>
							Demos
						</Button>
						<ColorSchemeToggle variant="compact" />
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Main>
				<Container size="xl">
					<div
						key={location.pathname}
						style={{
							animation: "fadeIn 0.3s ease-in",
						}}
					>
						<Outlet />
					</div>
				</Container>
			</AppShell.Main>
			<style>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</AppShell>
	);
};

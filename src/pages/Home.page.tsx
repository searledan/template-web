import { Button, Group, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";

export const HomePage = () => {
	return (
		<Stack gap="xl">
			<Welcome />
			<ColorSchemeToggle />
			<Group justify="center" mt="xl">
				<Button component={Link} to="/users" variant="filled">
					View Team Members
				</Button>
				<Button component={Link} to="/demo" variant="outline">
					View Demos
				</Button>
			</Group>
		</Stack>
	);
};

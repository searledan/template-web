import { Button, Group, useMantineColorScheme } from "@mantine/core";

export interface ColorSchemeToggleProps {
	buttonColor?: string;
}

export const ColorSchemeToggle = ({
	buttonColor = "#26890d",
}: ColorSchemeToggleProps) => {
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	return (
		<Group justify="center" mt="xl">
			<Button
				color={buttonColor}
				onClick={() => setColorScheme("light")}
				disabled={colorScheme === "light"}
			>
				Light
			</Button>

			<Button
				color={buttonColor}
				onClick={() => setColorScheme("dark")}
				disabled={colorScheme === "dark"}
			>
				Dark
			</Button>

			<Button
				color={buttonColor}
				onClick={() => setColorScheme("auto")}
				disabled={colorScheme === "auto"}
			>
				Auto
			</Button>
		</Group>
	);
};

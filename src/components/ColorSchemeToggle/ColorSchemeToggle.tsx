import {
	ActionIcon,
	Menu,
	Tooltip,
	useMantineColorScheme,
} from "@mantine/core";
import {
	IconCheck,
	IconDeviceDesktop,
	IconMoon,
	IconSun,
} from "@tabler/icons-react";

export interface ColorSchemeToggleProps {
	/** Compact variant for navigation header */
	variant?: "default" | "compact";
}

export const ColorSchemeToggle = ({
	variant = "default",
}: ColorSchemeToggleProps) => {
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	// Get the current icon based on color scheme
	const CurrentIcon =
		colorScheme === "light"
			? IconSun
			: colorScheme === "dark"
				? IconMoon
				: IconDeviceDesktop;

	const iconSize = variant === "compact" ? 18 : 24;
	const buttonSize = variant === "compact" ? "lg" : "xl";

	return (
		<Menu position="bottom-end" withArrow>
			<Menu.Target>
				<Tooltip label="Change color scheme" position="bottom" withArrow>
					<ActionIcon
						size={buttonSize}
						variant="default"
						aria-label="Toggle color scheme"
					>
						<CurrentIcon size={iconSize} />
					</ActionIcon>
				</Tooltip>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Color Scheme</Menu.Label>
				<Menu.Item
					leftSection={<IconSun size={16} />}
					rightSection={
						colorScheme === "light" ? <IconCheck size={16} /> : null
					}
					onClick={() => setColorScheme("light")}
					color={colorScheme === "light" ? "blue" : undefined}
				>
					Light
				</Menu.Item>
				<Menu.Item
					leftSection={<IconMoon size={16} />}
					rightSection={colorScheme === "dark" ? <IconCheck size={16} /> : null}
					onClick={() => setColorScheme("dark")}
					color={colorScheme === "dark" ? "blue" : undefined}
				>
					Dark
				</Menu.Item>
				<Menu.Item
					leftSection={<IconDeviceDesktop size={16} />}
					rightSection={colorScheme === "auto" ? <IconCheck size={16} /> : null}
					onClick={() => setColorScheme("auto")}
					color={colorScheme === "auto" ? "blue" : undefined}
				>
					Auto (System)
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

const meta = {
	title: "Components/ColorSchemeToggle",
	component: ColorSchemeToggle,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		buttonColor: {
			control: { type: "color" },
			description: "Custom color for the toggle buttons",
		},
	},
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const CustomColor: Story = {
	args: {
		buttonColor: "#7950f2",
	},
};

export const RedTheme: Story = {
	args: {
		buttonColor: "#fa5252",
	},
};

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
		variant: {
			control: { type: "select" },
			options: ["default", "compact"],
			description: "Visual variant of the toggle",
		},
	},
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: "default",
	},
};

export const Compact: Story = {
	args: {
		variant: "compact",
	},
};

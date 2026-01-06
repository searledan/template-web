import { Button } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

const meta = {
	title: "Mantine/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: { type: "color" },
			defaultValue: "#26890D",
		},
		size: {
			options: ["xs", "sm", "md", "lg", "xl"],
			control: { type: "inline-radio" },
			defaultValue: "md",
		},
	},
	args: { onClick: fn(), color: "#26890D" },
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByText("Button"));
		await expect(canvas.getByText("Button")).toBeInTheDocument();
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const XtraSmall: Story = {
	args: {
		size: "xs",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const Small: Story = {
	args: {
		size: "sm",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const Meduim: Story = {
	args: {
		size: "md",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const Large: Story = {
	args: {
		size: "lg",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

export const XtraLarge: Story = {
	args: {
		size: "xl",
	},
	render: (args) => <Button {...args}>Button</Button>,
};

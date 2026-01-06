import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Welcome } from "./Welcome";

const meta = {
	title: "Components/Welcome",
	component: Welcome,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		titleStart: {
			control: { type: "text" },
			defaultValue: "Welcome to",
		},
		titleEnd: {
			control: { type: "text" },
			defaultValue: " + Vite!",
		},
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("this guide")).toHaveAttribute(
			"href",
			"https://mantine.dev/guides/vite/",
		);
	},
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => <Welcome {...args} />,
};

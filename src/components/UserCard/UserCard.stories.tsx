import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { UserCard } from "./UserCard";

const meta = {
	title: "Components/UserCard",
	component: UserCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		name: {
			control: { type: "text" },
			description: "User's full name",
		},
		email: {
			control: { type: "text" },
			description: "User's email address",
		},
		avatarUrl: {
			control: { type: "text" },
			description: "URL to user's avatar image",
		},
		role: {
			control: { type: "text" },
			description: "User's role or title",
		},
		onClick: {
			action: "clicked",
			description: "Callback when card is clicked",
		},
	},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: "John Doe",
		email: "john.doe@example.com",
		avatarUrl: "https://i.pravatar.cc/150?img=1",
	},
};

export const WithRole: Story = {
	args: {
		name: "Jane Smith",
		email: "jane.smith@example.com",
		avatarUrl: "https://i.pravatar.cc/150?img=5",
		role: "Admin",
	},
};

export const WithoutAvatar: Story = {
	args: {
		name: "Bob Johnson",
		email: "bob.johnson@example.com",
		role: "Developer",
	},
};

export const LongName: Story = {
	args: {
		name: "Alexander Maximilian Cornelius Wellington III",
		email: "alexander.wellington@example.com",
		avatarUrl: "https://i.pravatar.cc/150?img=12",
		role: "Senior Architect",
	},
};

export const Clickable: Story = {
	args: {
		name: "Alice Cooper",
		email: "alice.cooper@example.com",
		avatarUrl: "https://i.pravatar.cc/150?img=9",
		role: "Manager",
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		// Verify the card contains expected content
		await expect(canvas.getByText("Alice Cooper")).toBeInTheDocument();
		await expect(
			canvas.getByText("alice.cooper@example.com"),
		).toBeInTheDocument();
		await expect(canvas.getByText("Manager")).toBeInTheDocument();

		// Click the card
		const card = canvas.getByText("Alice Cooper").closest("div")
			?.parentElement?.parentElement;
		if (card) {
			await userEvent.click(card);
			await expect(args.onClick).toHaveBeenCalled();
		}
	},
};

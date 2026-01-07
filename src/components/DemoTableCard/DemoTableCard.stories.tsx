import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Demo } from "@/models/Demo";
import { DemoTableCard } from "./DemoTableCard";

const sampleData: Demo[] = [
	{ id: 1, name: "First Demo Item", date: "2024-01-15" },
	{ id: 2, name: "Second Demo Item", date: "2024-02-20" },
	{ id: 3, name: "Third Demo Item", date: "2024-03-10" },
	{ id: 4, name: "Fourth Demo Item", date: "2024-04-05" },
	{ id: 5, name: "Fifth Demo Item", date: "2024-05-18" },
];

const meta = {
	title: "Components/DemoTableCard",
	component: DemoTableCard,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		data: {
			control: { type: "object" },
			description: "Array of demo items to display in the table",
		},
		title: {
			control: { type: "text" },
			description: "Optional title for the card",
		},
		withBorder: {
			control: { type: "boolean" },
			description: "Whether to show the card with a border",
		},
	},
} satisfies Meta<typeof DemoTableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: sampleData,
		title: "Demo Data",
		withBorder: true,
	},
};

export const CustomTitle: Story = {
	args: {
		data: sampleData,
		title: "My Custom Demo Table",
		withBorder: true,
	},
};

export const WithoutBorder: Story = {
	args: {
		data: sampleData,
		title: "Demo Data",
		withBorder: false,
	},
};

export const Empty: Story = {
	args: {
		data: [],
		title: "Empty Demo Table",
		withBorder: true,
	},
};

export const SingleItem: Story = {
	args: {
		data: [{ id: 1, name: "Single Demo Item", date: "2024-01-15" }],
		title: "Single Item",
		withBorder: true,
	},
};

export const LargeDataset: Story = {
	args: {
		data: Array.from({ length: 20 }, (_, i) => ({
			id: i + 1,
			name: `Demo Item ${i + 1}`,
			date: new Date(2024, 0, i + 1).toISOString().split("T")[0] ?? "",
		})),
		title: "Large Dataset",
		withBorder: true,
	},
};

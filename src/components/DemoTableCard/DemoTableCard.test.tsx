import type { Demo } from "@/models/Demo";
import { render, screen } from "@/utils/test";
import { DemoTableCard } from "./DemoTableCard";

const mockData: Demo[] = [
	{ id: 1, name: "Test Demo 1", date: "2024-01-15" },
	{ id: 2, name: "Test Demo 2", date: "2024-02-20" },
	{ id: 3, name: "Test Demo 3", date: "2024-03-10" },
];

describe("DemoTableCard component", () => {
	it("renders with demo data", () => {
		render(<DemoTableCard data={mockData} />);

		// Check default title
		expect(screen.getByText("Demo Data")).toBeInTheDocument();

		// Check table headers
		expect(screen.getByText("ID")).toBeInTheDocument();
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Date")).toBeInTheDocument();

		// Check data rows
		expect(screen.getByText("Test Demo 1")).toBeInTheDocument();
		expect(screen.getByText("Test Demo 2")).toBeInTheDocument();
		expect(screen.getByText("Test Demo 3")).toBeInTheDocument();
	});

	it("renders with custom title", () => {
		render(<DemoTableCard data={mockData} title="Custom Title" />);
		expect(screen.getByText("Custom Title")).toBeInTheDocument();
	});

	it("displays empty state when no data provided", () => {
		render(<DemoTableCard data={[]} />);
		expect(screen.getByText("No demo data available")).toBeInTheDocument();
	});

	it("formats dates correctly in UK format", () => {
		const singleItem: Demo[] = [
			{ id: 1, name: "Test Demo", date: "2024-01-15" },
		];
		render(<DemoTableCard data={singleItem} />);

		// UK format: 15 Jan 2024
		expect(screen.getByText("15 Jan 2024")).toBeInTheDocument();
	});

	it("displays ID badges for each row", () => {
		render(<DemoTableCard data={mockData} />);

		// Check that ID badges are present
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("renders without border when withBorder is false", () => {
		const { container } = render(
			<DemoTableCard data={mockData} withBorder={false} />,
		);

		// Component still renders
		expect(container.querySelector(".mantine-Card-root")).toBeInTheDocument();
	});
});

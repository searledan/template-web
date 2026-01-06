import { render, screen } from "@/utils/test";
import { UserCard } from "./UserCard";

describe("UserCard component", () => {
	it("renders user name and email", () => {
		render(<UserCard name="John Doe" email="john@example.com" />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("john@example.com")).toBeInTheDocument();
	});

	it("renders role badge when provided", () => {
		render(
			// biome-ignore lint/a11y/useValidAriaRole: "role" is a custom prop, not ARIA role
			<UserCard name="Jane Smith" email="jane@example.com" role="Admin" />,
		);

		expect(screen.getByText("Admin")).toBeInTheDocument();
	});

	it("does not render role badge when not provided", () => {
		render(<UserCard name="John Doe" email="john@example.com" />);

		expect(screen.queryByText("Admin")).not.toBeInTheDocument();
	});

	it("renders avatar with correct alt text", () => {
		render(
			<UserCard
				name="John Doe"
				email="john@example.com"
				avatarUrl="https://example.com/avatar.jpg"
			/>,
		);

		const avatar = screen.getByAltText("John Doe");
		expect(avatar).toBeInTheDocument();
	});

	it("calls onClick when card is clicked", () => {
		const mockOnClick = vi.fn();
		render(
			<UserCard
				name="John Doe"
				email="john@example.com"
				onClick={mockOnClick}
			/>,
		);

		const card = screen.getByText("John Doe").closest("div")
			?.parentElement?.parentElement;
		card?.click();

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});

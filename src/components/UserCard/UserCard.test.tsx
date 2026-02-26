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

		const card = screen.getByRole("button");
		card.click();

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it("activates onClick via Enter and Space keys", async () => {
		const { userEvent } = await import("@testing-library/user-event");
		const user = userEvent.setup();
		const mockOnClick = vi.fn();
		render(
			<UserCard
				name="John Doe"
				email="john@example.com"
				onClick={mockOnClick}
			/>,
		);

		const card = screen.getByRole("button");
		card.focus();

		await user.keyboard("{Enter}");
		expect(mockOnClick).toHaveBeenCalledTimes(1);

		await user.keyboard(" ");
		expect(mockOnClick).toHaveBeenCalledTimes(2);
	});

	it("does not have button role when onClick is not provided", () => {
		render(<UserCard name="John Doe" email="john@example.com" />);

		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});
});

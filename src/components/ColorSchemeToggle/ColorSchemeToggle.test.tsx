import { render, screen, userEvent } from "@/utils/test";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

describe("ColorSchemeToggle component", () => {
	it("renders buttons for all color schemes", async () => {
		const user = userEvent.setup();
		render(<ColorSchemeToggle />);

		// Click the toggle button to open the menu
		const toggleButton = screen.getByLabelText("Toggle color scheme");
		await user.click(toggleButton);

		// Check that all menu items are now visible
		expect(screen.getByText("Light")).toBeInTheDocument();
		expect(screen.getByText("Dark")).toBeInTheDocument();
		expect(screen.getByText("Auto (System)")).toBeInTheDocument();
	});
});

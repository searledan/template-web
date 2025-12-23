import { render, screen } from "@utils/test";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

describe("ColorSchemeToggle component", () => {
	it("renders buttons for all color schemes", () => {
		render(<ColorSchemeToggle />);
		expect(screen.getByText("Light"));
		expect(screen.getByText("Dark"));
		expect(screen.getByText("Auto"));
	});
});

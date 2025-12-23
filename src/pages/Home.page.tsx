import { ColorSchemeToggle } from "@components/ColorSchemeToggle";
import { Welcome } from "@components/Welcome";

export const HomePage = () => {
	return (
		<>
			<Welcome />
			<ColorSchemeToggle />
		</>
	);
};

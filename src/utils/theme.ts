import { Button, Card, createTheme, TextInput } from "@mantine/core";

export const theme = createTheme({
	/** Smooth transitions for interactive elements */
	components: {
		Button: Button.extend({
			defaultProps: {
				style: {
					transition: "all 0.2s ease-in-out",
				},
			},
		}),
		Card: Card.extend({
			defaultProps: {
				style: {
					transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
				},
			},
		}),
		TextInput: TextInput.extend({
			defaultProps: {
				styles: {
					input: {
						transition: "border-color 0.2s",
					},
				},
			},
		}),
	},
});

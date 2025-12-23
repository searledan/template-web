import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Decorator } from "@storybook/react";
import { theme } from "../src/utils/theme";

import "@mantine/core/styles.css";

export const parameters = {
	layout: "fullscreen",
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/i,
		},
	},
	backgrounds: { disable: true },
	a11y: {
		test: "todo",
	},
};

export const globalTypes = {
	theme: {
		name: "Theme",
		description: "Mantine color scheme",
		defaultValue: "light",
		toolbar: {
			icon: "mirror",
			items: [
				{ value: "light", title: "Light" },
				{ value: "dark", title: "Dark" },
			],
		},
	},
};

export const decorators: Decorator[] = [
	(renderStory, context) => {
		const scheme = (context.globals.theme || "light") as "light" | "dark";
		return (
			<MantineProvider theme={theme} forceColorScheme={scheme}>
				<ColorSchemeScript />
				{renderStory()}
			</MantineProvider>
		);
	},
];

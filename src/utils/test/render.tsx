import { MantineProvider } from "@mantine/core";
import { render as testingLibraryRender } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { theme } from "@/utils/theme";

export const render = (ui: ReactNode) => {
	return testingLibraryRender(ui, {
		wrapper: ({ children }: { children: ReactNode }) => (
			<MemoryRouter>
				<MantineProvider theme={theme} env="test">
					{children}
				</MantineProvider>
			</MemoryRouter>
		),
	});
};

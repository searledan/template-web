import { MantineProvider } from "@mantine/core";
import { theme } from "@utils/theme";
import { Router } from "@/Router";

import "@mantine/core/styles.css";

export const App = () => {
	return (
		<MantineProvider theme={theme}>
			<Router />
		</MantineProvider>
	);
};

export default App;

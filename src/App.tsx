import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "@/Router";
import { theme } from "@/utils/theme";

import "@mantine/core/styles.css";
import { DemoProvider } from "./providers/DemoProvider";

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />

			<MantineProvider theme={theme}>
				<DemoProvider>
					<Router />
				</DemoProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
};

export default App;

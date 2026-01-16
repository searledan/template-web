import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DemoProvider } from "@/providers/DemoProvider";
import { UserProvider } from "@/providers/UserProvider";
import { Router } from "@/Router";
import { theme } from "@/utils/theme";
import "@mantine/core/styles.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			gcTime: 5 * 60 * 1000,
		},
	},
});

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<ColorSchemeScript defaultColorScheme="auto" />

			<MantineProvider theme={theme} defaultColorScheme="auto">
				<DemoProvider>
					<UserProvider>
						<Router />
					</UserProvider>
				</DemoProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
};

export default App;

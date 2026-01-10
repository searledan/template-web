import {
	Alert,
	Center,
	Group,
	Pagination,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconAlertCircle, IconTable } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { DemoTableCard } from "@/components/DemoTableCard/DemoTableCard";
import { DemoTableCardSkeleton } from "@/components/DemoTableCard/DemoTableCardSkeleton";
import { useDemo } from "@/hooks/useDemo";

const ITEMS_PER_PAGE = 20;

export const DemoPage = () => {
	const { demos, isPending, isError } = useDemo();
	const [activePage, setActivePage] = useState(1);

	useEffect(() => {
		document.title = "Demos | Template Web";
	}, []);

	if (isPending)
		return (
			<Stack gap="lg" py="lg">
				<div>
					<Title order={1}>Demos</Title>
					<Text c="dimmed" mt="xs">
						Browse and explore demo data
					</Text>
				</div>
				<DemoTableCardSkeleton title="All Demos" rows={10} />
			</Stack>
		);

	if (isError)
		return (
			<Stack gap="lg" py="lg">
				<div>
					<Title order={1}>Demos</Title>
					<Text c="dimmed" mt="xs">
						Browse and explore demo data
					</Text>
				</div>
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Error loading demos"
					color="red"
				>
					There was a problem loading the demo data. Please try refreshing the
					page.
				</Alert>
			</Stack>
		);

	if (!demos || demos.length === 0)
		return (
			<Stack gap="lg" py="lg">
				<div>
					<Title order={1}>Demos</Title>
					<Text c="dimmed" mt="xs">
						Browse and explore demo data
					</Text>
				</div>
				<Center py="xl">
					<Stack align="center" gap="md">
						<ThemeIcon size={60} radius="xl" variant="light" color="gray">
							<IconTable size={30} />
						</ThemeIcon>
						<Text size="lg" fw={500}>
							No demo data available
						</Text>
						<Text size="sm" c="dimmed">
							Demo data will appear here when available
						</Text>
					</Stack>
				</Center>
			</Stack>
		);

	// Calculate pagination
	const totalPages = Math.ceil(demos.length / ITEMS_PER_PAGE);
	const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedDemos = demos.slice(startIndex, endIndex);

	return (
		<Stack gap="lg" py="lg">
			<div>
				<Title order={1}>Demos</Title>
				<Text c="dimmed" mt="xs">
					Browse and explore demo data
				</Text>
			</div>
			<Stack gap="md">
				<DemoTableCard data={paginatedDemos} title="All Demos" />
				{totalPages > 1 && (
					<Group justify="center">
						<Pagination
							total={totalPages}
							value={activePage}
							onChange={setActivePage}
							size="sm"
						/>
					</Group>
				)}
			</Stack>
		</Stack>
	);
};

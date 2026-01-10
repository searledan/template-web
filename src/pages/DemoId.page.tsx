import {
	Alert,
	Anchor,
	Breadcrumbs,
	Center,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconAlertCircle, IconTable } from "@tabler/icons-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { DemoTableCard } from "@/components/DemoTableCard/DemoTableCard";
import { DemoTableCardSkeleton } from "@/components/DemoTableCard/DemoTableCardSkeleton";
import { useDemoById } from "@/hooks/useDemoById";

export const DemoIdPage = () => {
	const { id } = useParams();
	const {
		data: demo,
		isPending,
		isError,
	} = useDemoById(parseInt(id ? id : "0", 10));

	useEffect(() => {
		document.title = `Demo ${id} | Template Web`;
	}, [id]);

	if (isPending)
		return (
			<Stack gap="lg" py="lg">
				<Breadcrumbs>
					<Anchor component={Link} to="/demo">
						Demos
					</Anchor>
					<Text>Demo {id}</Text>
				</Breadcrumbs>
				<div>
					<Title order={1}>Demo {id}</Title>
					<Text c="dimmed" mt="xs">
						Viewing demo details
					</Text>
				</div>
				<DemoTableCardSkeleton title={`Demo ${id}`} rows={1} />
			</Stack>
		);

	if (isError)
		return (
			<Stack gap="lg" py="lg">
				<Breadcrumbs>
					<Anchor component={Link} to="/demo">
						Demos
					</Anchor>
					<Text>Demo {id}</Text>
				</Breadcrumbs>
				<div>
					<Title order={1}>Demo {id}</Title>
					<Text c="dimmed" mt="xs">
						Viewing demo details
					</Text>
				</div>
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Error loading demo"
					color="red"
				>
					There was a problem loading this demo. Please try again or go back to
					the demos list.
				</Alert>
			</Stack>
		);

	if (!demo)
		return (
			<Stack gap="lg" py="lg">
				<Breadcrumbs>
					<Anchor component={Link} to="/demo">
						Demos
					</Anchor>
					<Text>Demo {id}</Text>
				</Breadcrumbs>
				<div>
					<Title order={1}>Demo {id}</Title>
					<Text c="dimmed" mt="xs">
						Viewing demo details
					</Text>
				</div>
				<Center py="xl">
					<Stack align="center" gap="md">
						<ThemeIcon size={60} radius="xl" variant="light" color="gray">
							<IconTable size={30} />
						</ThemeIcon>
						<Text size="lg" fw={500}>
							Demo not found
						</Text>
						<Text size="sm" c="dimmed">
							This demo doesn't exist or has been removed
						</Text>
					</Stack>
				</Center>
			</Stack>
		);

	return (
		<Stack gap="lg" py="lg">
			<Breadcrumbs>
				<Anchor component={Link} to="/demo">
					Demos
				</Anchor>
				<Text>Demo {demo.id}</Text>
			</Breadcrumbs>
			<div>
				<Title order={1}>Demo {demo.id}</Title>
				<Text c="dimmed" mt="xs">
					Viewing demo details
				</Text>
			</div>
			<DemoTableCard data={[demo]} title={`Demo ${demo.id}`} />
		</Stack>
	);
};

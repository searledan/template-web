import { Container, Text } from "@mantine/core";
import { DemoTableCard } from "@/components/DemoTableCard/DemoTableCard";
import { useDemo } from "@/hooks/useDemo";

export const DemoPage = () => {
	const { demos, isPending, isError } = useDemo();

	if (isPending)
		return (
			<Container py="lg">
				<Text>Loading demos...</Text>
			</Container>
		);

	if (isError)
		return (
			<Container py="lg">
				<Text c="red">Error loading demos.</Text>
			</Container>
		);

	return (
		<Container py="lg">
			<DemoTableCard data={demos ?? []} title="Demo Data" />
		</Container>
	);
};

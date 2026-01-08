import { Container, Text } from "@mantine/core";
import { DemoTableCard } from "@/components/DemoTableCard/DemoTableCard";
import { DemoTableCardSkeleton } from "@/components/DemoTableCard/DemoTableCardSkeleton";
import { useDemo } from "@/hooks/useDemo";

export const DemoPage = () => {
	const { demos, isPending, isError } = useDemo();

	if (isPending)
		return (
			<Container py="lg">
				<DemoTableCardSkeleton title="Demos" rows={5} />
			</Container>
		);

	if (isError)
		return (
			<Container py="lg">
				<Text c="red">Error loading demos.</Text>
			</Container>
		);

	if (!demos || demos.length === 0)
		return (
			<Text py="lg" px="xl">
				No demo to display.
			</Text>
		);

	return (
		<Container py="lg">
			<DemoTableCard data={demos} title="Demos" />
		</Container>
	);
};

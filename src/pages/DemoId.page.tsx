import { Container, Text } from "@mantine/core";
import { useParams } from "react-router";
import { DemoTableCard } from "@/components/DemoTableCard/DemoTableCard";
import { useDemoById } from "@/hooks/useDemoById";

export const DemoIdPage = () => {
	const { id } = useParams();
	const {
		data: demo,
		isPending,
		isError,
	} = useDemoById(parseInt(id ? id : "0", 10));

	if (isPending)
		return (
			<Text py="lg" px="xl">
				Loading demo...
			</Text>
		);

	if (isError)
		return (
			<Text py="lg" px="xl" c="red">
				Error loading demo.
			</Text>
		);

	if (!demo)
		return (
			<Text py="lg" px="xl">
				No demo to display.
			</Text>
		);

	return (
		<Container py="lg">
			<DemoTableCard data={[demo]} title={`Demo ${demo.id}`} />
		</Container>
	);
};

import { Table, Text } from "@mantine/core";
import { useParams } from "react-router";
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
		<Table>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Demo ID</Table.Th>
					<Table.Th>Demo Name</Table.Th>
					<Table.Th>Demo Date</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				<Table.Tr key={demo.id}>
					<Table.Td>{demo.id}</Table.Td>
					<Table.Td>{demo.name}</Table.Td>
					<Table.Td>{demo.date}</Table.Td>
				</Table.Tr>
			</Table.Tbody>
		</Table>
	);
};

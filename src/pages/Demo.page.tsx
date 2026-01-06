import { Table, Text } from "@mantine/core";
import { useDemo } from "@/hooks/useDemo";

export const DemoPage = () => {
	const { demos, isPending, isError } = useDemo();

	if (isPending)
		return (
			<Text py="lg" px="xl">
				Loading demos...
			</Text>
		);

	if (isError)
		return (
			<Text py="lg" px="xl" c="red">
				Error loading demos.
			</Text>
		);

	if (demos && demos.length <= 0)
		return (
			<Text py="lg" px="xl">
				No demos to display.
			</Text>
		);

	const rows = demos?.map((demo) => (
		<Table.Tr key={demo.id}>
			<Table.Td>{demo.id}</Table.Td>
			<Table.Td>{demo.name}</Table.Td>
			<Table.Td>{demo.date}</Table.Td>
		</Table.Tr>
	));

	return (
		<Table>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Demo ID</Table.Th>
					<Table.Th>Demo Name</Table.Th>
					<Table.Th>Demo Date</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
};

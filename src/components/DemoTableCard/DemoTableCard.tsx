import { Badge, Card, Table, Text } from "@mantine/core";
import type { Demo } from "@/models/Demo";

export interface DemoTableCardProps {
	/** Array of demo items to display in the table */
	data: Demo[];
	/** Optional title for the card */
	title?: string;
	/** Whether to show the card with shadow */
	withBorder?: boolean;
}

/**
 * A card component that displays demo data in a table format.
 * Shows ID, Name, and Date columns for each demo item.
 *
 * @example
 * ```tsx
 * <DemoTableCard data={demos} title="Demo Data" />
 * ```
 */
export const DemoTableCard = ({
	data,
	title = "Demo Data",
	withBorder = true,
}: DemoTableCardProps) => {
	const rows = data.map((item) => (
		<Table.Tr key={item.id}>
			<Table.Td>
				<Badge variant="light" size="sm">
					{item.id}
				</Badge>
			</Table.Td>
			<Table.Td>
				<Text fw={500}>{item.name}</Text>
			</Table.Td>
			<Table.Td>
				<Text c="dimmed" size="sm">
					{new Date(item.date).toLocaleDateString("en-GB", {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
				</Text>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Card withBorder={withBorder} padding="lg" radius="md" shadow="sm">
			{title && (
				<Card.Section withBorder inheritPadding py="md">
					<Text fw={600} size="lg">
						{title}
					</Text>
				</Card.Section>
			)}

			<Card.Section>
				{data.length === 0 ? (
					<Text c="dimmed" ta="center" py="xl">
						No demo data available
					</Text>
				) : (
					<Table striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>ID</Table.Th>
								<Table.Th>Name</Table.Th>
								<Table.Th>Date</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				)}
			</Card.Section>
		</Card>
	);
};

import { Card, Skeleton, Table, Text } from "@mantine/core";

export interface DemoTableCardSkeletonProps {
	/** Optional title for the card */
	title?: string;
	/** Whether to show the card with shadow */
	withBorder?: boolean;
	/** Number of skeleton rows to display */
	rows?: number;
}

/**
 * Skeleton loading state for DemoTableCard component.
 * Displays a placeholder that mirrors the structure of DemoTableCard.
 *
 * @example
 * ```tsx
 * {isPending ? (
 *   <DemoTableCardSkeleton title="Demos" rows={3} />
 * ) : (
 *   <DemoTableCard data={demos} title="Demos" />
 * )}
 * ```
 */
export const DemoTableCardSkeleton = ({
	title = "Demo Data",
	withBorder = true,
	rows = 3,
}: DemoTableCardSkeletonProps) => {
	const skeletonRows = Array.from({ length: rows }, (_, index) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton rows with no state
		<Table.Tr key={index}>
			<Table.Td>
				<Skeleton height={20} width={40} radius="sm" />
			</Table.Td>
			<Table.Td>
				<Skeleton height={20} width="60%" />
			</Table.Td>
			<Table.Td>
				<Skeleton height={16} width={100} />
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
				<Table striped highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>ID</Table.Th>
							<Table.Th>Name</Table.Th>
							<Table.Th>Date</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{skeletonRows}</Table.Tbody>
				</Table>
			</Card.Section>
		</Card>
	);
};

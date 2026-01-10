import { Badge, Card, Table, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
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
 * Rows are clickable and navigate to the detail page.
 * Supports keyboard navigation with arrow keys and Enter.
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
	const navigate = useNavigate();
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const tableRef = useRef<HTMLTableSectionElement>(null);

	// Keyboard navigation
	useHotkeys([
		[
			"ArrowDown",
			() => {
				if (selectedIndex < data.length - 1) {
					setSelectedIndex(selectedIndex + 1);
				}
			},
		],
		[
			"ArrowUp",
			() => {
				if (selectedIndex > 0) {
					setSelectedIndex(selectedIndex - 1);
				}
			},
		],
		[
			"Enter",
			() => {
				if (selectedIndex >= 0 && selectedIndex < data.length) {
					const selectedItem = data[selectedIndex];
					if (selectedItem) {
						navigate(`/demo/${selectedItem.id}`);
					}
				}
			},
		],
	]);

	const handleRowClick = (id: number, index: number) => {
		setSelectedIndex(index);
		navigate(`/demo/${id}`);
	};

	const rows = data.map((item, index) => (
		<Table.Tr
			key={item.id}
			style={{
				cursor: "pointer",
				transition: "background-color 0.15s ease, transform 0.15s ease",
				backgroundColor:
					selectedIndex === index
						? "var(--mantine-color-blue-light)"
						: undefined,
			}}
			onClick={() => handleRowClick(item.id, index)}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "scale(1.01)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "scale(1)";
			}}
			tabIndex={0}
			onFocus={() => setSelectedIndex(index)}
		>
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
						<Table.Tbody ref={tableRef}>{rows}</Table.Tbody>
					</Table>
				)}
			</Card.Section>
		</Card>
	);
};

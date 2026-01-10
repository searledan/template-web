import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";

export interface UserCardProps {
	/** User's full name */
	name: string;
	/** User's email address */
	email: string;
	/** URL to user's avatar image */
	avatarUrl?: string;
	/** User's role or title (optional) */
	role?: string;
	/** Callback when card is clicked */
	onClick?: () => void;
}

/**
 * UserCard component displays user profile information in a card format.
 *
 * Shows avatar, name, email, and optional role badge in a clean, consistent layout.
 *
 * @example
 * ```tsx
 * <UserCard
 *   name="John Doe"
 *   email="john@example.com"
 *   avatarUrl="https://..."
 *   role="Admin"
 * />
 * ```
 */
export const UserCard = ({
	name,
	email,
	avatarUrl,
	role,
	onClick,
}: UserCardProps) => {
	return (
		<Card
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			style={{
				cursor: onClick ? "pointer" : "default",
				transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
			}}
			onClick={onClick}
			onMouseEnter={(e) => {
				if (onClick) {
					e.currentTarget.style.transform = "translateY(-4px)";
					e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
				}
			}}
			onMouseLeave={(e) => {
				if (onClick) {
					e.currentTarget.style.transform = "translateY(0)";
					e.currentTarget.style.boxShadow = "";
				}
			}}
		>
			<Group>
				<Avatar src={avatarUrl} size="md" radius="xl" alt={name} />
				<Stack gap="xs" style={{ flex: 1 }}>
					<Group justify="space-between">
						<Text fw={500} size="lg">
							{name}
						</Text>
						{role && (
							<Badge color="blue" variant="light" size="xs">
								{role}
							</Badge>
						)}
					</Group>
					<Text size="sm" c="dimmed">
						{email}
					</Text>
				</Stack>
			</Group>
		</Card>
	);
};

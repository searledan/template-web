import { Card, Group, Skeleton, Stack } from "@mantine/core";

export interface UserCardSkeletonProps {
	/** Whether to show the role badge skeleton */
	withRole?: boolean;
}

/**
 * Skeleton loading state for UserCard component.
 * Displays a placeholder that mirrors the structure of UserCard.
 *
 * @example
 * ```tsx
 * {isPending ? (
 *   <UserCardSkeleton withRole />
 * ) : (
 *   <UserCard name={user.name} email={user.email} />
 * )}
 * ```
 */
export const UserCardSkeleton = ({
	withRole = true,
}: UserCardSkeletonProps) => {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Group>
				<Skeleton circle height={40} width={40} />
				<Stack gap="xs" style={{ flex: 1 }}>
					<Group justify="space-between">
						<Skeleton height={24} width="40%" />
						{withRole && <Skeleton height={18} width={60} radius="sm" />}
					</Group>
					<Skeleton height={16} width="60%" />
				</Stack>
			</Group>
		</Card>
	);
};

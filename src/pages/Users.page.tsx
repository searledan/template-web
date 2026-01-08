import { Button, Grid, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { UserCard } from "@/components/UserCard/UserCard";
import { UserCardSkeleton } from "@/components/UserCard/UserCardSkeleton";
import { useUsers } from "@/hooks/useUsers";

/**
 * UsersPage displays a grid of user cards.
 *
 * Fetches user data from the UserProvider context and displays
 * them in a responsive grid layout.
 */
export const UsersPage = () => {
	const { users, isPending, isError } = useUsers();

	// Handle loading state
	if (isPending) {
		return (
			<Stack gap="xl" py="lg">
				<Button component={Link} to="/" variant="subtle" w="fit-content">
					← Back to Home
				</Button>

				<div>
					<Title order={1}>Team Members</Title>
					<Text c="dimmed" mt="xs">
						Browse our team directory
					</Text>
				</div>

				<Grid>
					{Array.from({ length: 6 }, (_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton items with no state
						<Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
							<UserCardSkeleton withRole />
						</Grid.Col>
					))}
				</Grid>
			</Stack>
		);
	}

	// Handle error state
	if (isError) {
		return (
			<Stack py="lg" px="xl">
				<Text c="red">Error loading users. Please try again.</Text>
			</Stack>
		);
	}

	// Handle empty state
	if (!users || users.length === 0) {
		return (
			<Stack py="lg" px="xl">
				<Text>No users to display.</Text>
			</Stack>
		);
	}

	// Main content
	return (
		<Stack gap="xl" py="lg">
			<Button component={Link} to="/" variant="subtle" w="fit-content">
				← Back to Home
			</Button>

			<div>
				<Title order={1}>Team Members</Title>
				<Text c="dimmed" mt="xs">
					Browse our team directory
				</Text>
			</div>

			<Grid>
				{users.map((user) => (
					<Grid.Col key={user.id} span={{ base: 12, sm: 6, lg: 4 }}>
						<UserCard
							name={user.name}
							email={user.email}
							avatarUrl={user.avatarUrl}
							role={user.role}
							onClick={() => console.log(`Clicked user: ${user.name}`)}
						/>
					</Grid.Col>
				))}
			</Grid>
		</Stack>
	);
};

import {
	ActionIcon,
	Alert,
	Button,
	Center,
	Grid,
	Stack,
	Text,
	TextInput,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import {
	IconAlertCircle,
	IconSearch,
	IconUsers,
	IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
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
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Update page title
	useEffect(() => {
		document.title = "Team Members | Template Web";
	}, []);

	// Keyboard shortcut: Press "/" to focus search
	useHotkeys([
		["slash", () => searchInputRef.current?.focus(), { preventDefault: true }],
	]);

	// Filter users based on search query
	const filteredUsers = users?.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.role?.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Handle loading state
	if (isPending) {
		return (
			<Stack gap="lg" py="lg">
				<div>
					<Title order={1}>Team Members</Title>
					<Text c="dimmed" mt="xs">
						Browse our team directory
					</Text>
				</div>

				<TextInput
					placeholder="Search team members..."
					leftSection={<IconSearch size={16} />}
					disabled
				/>

				<Grid>
					{Array.from({ length: 6 }, (_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton items with no state
						<Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4, xl: 3 }}>
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
			<Stack gap="lg" py="lg">
				<div>
					<Title order={1}>Team Members</Title>
					<Text c="dimmed" mt="xs">
						Browse our team directory
					</Text>
				</div>
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Error loading users"
					color="red"
				>
					There was a problem loading the team members. Please try refreshing
					the page.
				</Alert>
			</Stack>
		);
	}

	// Handle empty state
	if (!users || users.length === 0) {
		return (
			<Stack gap="lg" py="lg">
				<div>
					<Title order={1}>Team Members</Title>
					<Text c="dimmed" mt="xs">
						Browse our team directory
					</Text>
				</div>
				<Center py="xl">
					<Stack align="center" gap="md">
						<ThemeIcon size={60} radius="xl" variant="light" color="gray">
							<IconUsers size={30} />
						</ThemeIcon>
						<Text size="lg" fw={500}>
							No team members yet
						</Text>
						<Text size="sm" c="dimmed">
							Add your first team member to get started
						</Text>
					</Stack>
				</Center>
			</Stack>
		);
	}

	// Main content
	return (
		<Stack gap="lg" py="lg">
			<div>
				<Title order={1}>Team Members</Title>
				<Text c="dimmed" mt="xs">
					Browse our team directory
				</Text>
			</div>

			<Stack gap="xs">
				<TextInput
					ref={searchInputRef}
					placeholder="Search team members... (Press / to focus)"
					leftSection={<IconSearch size={16} />}
					rightSection={
						searchQuery && (
							<ActionIcon
								variant="subtle"
								onClick={() => setSearchQuery("")}
								aria-label="Clear search"
							>
								<IconX size={16} />
							</ActionIcon>
						)
					}
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.currentTarget.value)}
				/>
				{searchQuery && (
					<Text size="sm" c="dimmed">
						Showing {filteredUsers?.length} of {users?.length} results
					</Text>
				)}
			</Stack>

			{filteredUsers && filteredUsers.length === 0 ? (
				<Center py="xl">
					<Stack align="center" gap="md">
						<ThemeIcon size={60} radius="xl" variant="light" color="gray">
							<IconSearch size={30} />
						</ThemeIcon>
						<Text size="lg" fw={500}>
							No results found
						</Text>
						<Text size="sm" c="dimmed">
							Try adjusting your search query or clear the search
						</Text>
						<Button variant="light" onClick={() => setSearchQuery("")}>
							Clear Search
						</Button>
					</Stack>
				</Center>
			) : (
				<Grid gutter="lg">
					{filteredUsers?.map((user) => (
						<Grid.Col key={user.id} span={{ base: 12, sm: 6, lg: 4, xl: 3 }}>
							<UserCard
								name={user.name}
								email={user.email}
								avatarUrl={user.avatarUrl}
								role={user.role}
							/>
						</Grid.Col>
					))}
				</Grid>
			)}
		</Stack>
	);
};

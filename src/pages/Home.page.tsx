import { Button, Card, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router";

const useCardHoverEffect = () => {
	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.transform = "translateY(-4px)";
		e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.transform = "translateY(0)";
		e.currentTarget.style.boxShadow = "";
	};

	return {
		style: {
			transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
		},
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
	};
};

export const HomePage = () => {
	const cardHoverProps = useCardHoverEffect();

	useEffect(() => {
		document.title = "Home | Template Web";
	}, []);

	return (
		<Stack gap="xl" py="xl">
			{/* Hero Section */}
			<Stack gap="md" ta="center">
				<Title order={1} size="3rem">
					Welcome to Template Web
				</Title>
				<Text size="xl" c="dimmed" maw={600} mx="auto">
					A modern React template with Mantine UI, TypeScript, and best
					practices built in
				</Text>
			</Stack>

			{/* Feature Cards */}
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt="xl">
				<Card
					shadow="sm"
					padding="lg"
					radius="md"
					withBorder
					{...cardHoverProps}
				>
					<Stack gap="md">
						<div>
							<Title order={3}>Team Directory</Title>
						</div>
						<Text size="sm" c="dimmed">
							Browse and manage your team members with user cards, skeleton
							loading states, and responsive grid layouts.
						</Text>
						<Button component={Link} to="/users" fullWidth>
							View Team
						</Button>
					</Stack>
				</Card>

				<Card
					shadow="sm"
					padding="lg"
					radius="md"
					withBorder
					{...cardHoverProps}
				>
					<Stack gap="md">
						<div>
							<Title order={3}>Demo Data</Title>
						</div>
						<Text size="sm" c="dimmed">
							Explore demo data examples with interactive tables, data fetching
							patterns, and React Query integration.
						</Text>
						<Button component={Link} to="/demo" variant="light" fullWidth>
							View Demos
						</Button>
					</Stack>
				</Card>
			</SimpleGrid>

			{/* Quick Info */}
			<Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
				<Stack gap="sm">
					<Title order={4}>Features Included</Title>
					<SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
						<Text size="sm">✅ React 19 + TypeScript</Text>
						<Text size="sm">✅ Mantine UI Components</Text>
						<Text size="sm">✅ React Query Integration</Text>
						<Text size="sm">✅ React Router v7</Text>
						<Text size="sm">✅ Skeleton Loading States</Text>
						<Text size="sm">✅ Dark Mode Support</Text>
						<Text size="sm">✅ Vitest + Testing Library</Text>
						<Text size="sm">✅ Storybook Ready</Text>
					</SimpleGrid>
				</Stack>
			</Card>
		</Stack>
	);
};

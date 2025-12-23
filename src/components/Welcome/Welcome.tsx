import { Anchor, Text, Title } from "@mantine/core";
import classes from "./Welcome.module.css";

export interface WelcomeProps {
	titleStart?: string;
	titleEnd?: string;
}

export const Welcome = (props: WelcomeProps) => {
	const _titleStart = props.titleStart || "Welcome to ";
	const _titleEnd = props.titleEnd || " + Vite!";

	return (
		<>
			<Title className={classes.title} ta="center" mt={100}>
				{_titleStart}
				<Text
					inherit
					variant="gradient"
					component="span"
					gradient={{ from: "pink", to: "yellow" }}
				>
					{_titleEnd}
				</Text>
			</Title>
			<Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
				This starter Vite project includes a minimal setup, if you want to learn
				more on Mantine + Vite integration follow{" "}
				<Anchor href="https://mantine.dev/guides/vite/" size="lg">
					this guide
				</Anchor>
				. To get started edit pages/Home.page.tsx file.
			</Text>
		</>
	);
};

import { Anchor, Text, Title } from "@mantine/core";

import classes from "./Welcome.module.css";

export interface WelcomeProps {
	titleStart?: string;
	titleEnd?: string;
}

export const Welcome = ({
	titleStart = "Welcome to",
	titleEnd = " + Vite!",
}: WelcomeProps) => {
	return (
		<>
			<Title className={classes.title} ta="center" mt={100}>
				{titleStart}{" "}
				<Text
					inherit
					variant="gradient"
					component="span"
					gradient={{ from: "pink", to: "yellow" }}
				>
					{titleEnd}
				</Text>
			</Title>
			<Text ta="center" size="lg" maw={580} mx="auto" mt="xl">
				This starter Vite project includes a minimal setup, if you want to learn
				more on Mantine + Vite integration follow{" "}
				<Anchor
					className={classes.anchor}
					href="https://mantine.dev/guides/vite/"
					size="lg"
					td="underline"
				>
					this guide
				</Anchor>
				. To get started edit pages/Home.page.tsx file.
			</Text>
		</>
	);
};

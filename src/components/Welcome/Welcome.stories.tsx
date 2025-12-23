import { Welcome } from "./Welcome";

export default {
	title: "Welcome",
};

export const Usage = () => (
	<>
		<Welcome />
		<Welcome titleStart="Custom title start" />
		<Welcome titleEnd="custom title end" />
		<Welcome titleStart="Custom title start" titleEnd="and custom title end" />
	</>
);

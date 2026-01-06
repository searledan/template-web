import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";

const rootElement = document.getElementById("root") as Element;

ReactDOM.createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

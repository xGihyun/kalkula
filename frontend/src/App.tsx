import type { JSX } from "solid-js";
import Navbar from "./components/navbar";

type AppProps = {
	children?: JSX.Element;
};

function App(props: AppProps) {
	return (
		<>
      <Navbar />

			<main class="h-screen pt-20">{props.children}</main>
		</>
	);
}

export default App;

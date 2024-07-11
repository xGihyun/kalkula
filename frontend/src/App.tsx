import Navbar from "./components/navbar";
import { WithChildren } from "./types/props";

function App(props: WithChildren) {
	return (
		<>
      <Navbar />

			<main class="h-screen pt-20">{props.children}</main>
		</>
	);
}

export default App;

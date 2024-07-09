import { For, type JSX } from "solid-js";
import { Button } from "./ui/button";

export default function Navbar(): JSX.Element {
	const ROUTES = [
		{
			name: "Calculator",
			path: "/calculator",
		},
		{
			name: "Formulas",
			path: "/formulas",
		},
	];

	return (
		<nav class="px-10 py-4 h-20 flex items-center justify-between bg-card fixed w-full border-b">
			<div>Kalkula</div>

			<div class="space-x-4">
				<For each={ROUTES}>{(r) => <a href={r.path}>{r.name}</a>}</For>
			</div>

      <Button>
        Login
      </Button>
		</nav>
	);
}

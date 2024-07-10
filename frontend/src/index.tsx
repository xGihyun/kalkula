/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Route, Router, useNavigate } from "@solidjs/router";
import Calculator from "./pages/calculator";
import App from "./App";
import "mathlive/fonts.css";
import { setWorkspaces } from "./lib/states";
import { GetWorkspaces } from "@/wailsjs/go/backend/Workspaces";

const root = document.getElementById("app");

// NOTE: Make it global along with a `createAsyncStore` I guess
export async function loadWorkspaces() {
  const navigate = useNavigate()
	const ws = await GetWorkspaces();
	console.log("Workspaces:", ws);

	// TODO:
	// Set `workspaces` store to the value returned by `HandleGetWorkspaces`
	// On the component, navigate to the first workspace

	setWorkspaces(ws);

  navigate(`/calculator?workspace=${ws[0].id}`)
}

render(
	() => (
		<Router root={App}>
			<Route path="/" component={() => <h1>Home</h1>} />
			<Route path="/calculator" component={Calculator} />
		</Router>
	),
	root!,
);

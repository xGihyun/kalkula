/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Route, Router } from "@solidjs/router";
import Workspaces from "./pages/workspaces";
import Workspace from "./pages/workspace";
import App from "./App";
import "mathlive/fonts.css";

const root = document.getElementById("app");

render(
	() => (
		<Router root={App}>
			<Route path="/" component={() => <h1>Home</h1>} />
			<Route path="/workspaces" component={Workspaces}>
				<Route path="/" />
				<Route path="/:id" component={Workspace} />
			</Route>
		</Router>
	),
	root!,
);

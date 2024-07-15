/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Navigate, Route, Router } from "@solidjs/router";
import Workspaces from "./pages/workspaces";
import Workspace from "./pages/workspace";
import App from "./App";
import "mathlive/fonts.css";
import { loadWorkspaces } from "./server/workspace";
import { workspaces } from "./lib/states";

const root = document.getElementById("app");

render(
	() => (
		<Router root={App}>
			<Route path="/" 
      preload={loadWorkspaces}
    />
			<Route path="/workspaces" component={Workspaces}>
				<Route
					path="/"
					preload={loadWorkspaces}
					component={() => (
						<Navigate href={`/workspaces/${workspaces[0].id}`} />
					)}
				/>
				<Route path="/:id" component={Workspace} />
			</Route>
		</Router>
	),
	root!,
);

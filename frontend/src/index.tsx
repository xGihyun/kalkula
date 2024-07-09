/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Route, Router } from "@solidjs/router";
import Calculator from "./pages/calculator";
import App from "./App";
import "mathlive/fonts.css";

const root = document.getElementById("app");

render(
  () => (
    <Router root={App}>
      <Route path="/" component={() => <h1>Home</h1>} />
      <Route path="/calculator" component={Calculator} />
    </Router>
  ),
  root!,
);

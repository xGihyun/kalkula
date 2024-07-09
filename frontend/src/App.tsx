import "./index.css"
import type { JSX } from "solid-js";

type AppProps = {
  children?: JSX.Element
}

function App(props: AppProps) {
  return (
    <>
      <div class="bg-red-500">
        <a href="/">Home</a>
        <a href="/calculator">Calculator</a>
      </div>

      {props.children}
    </>
  );
}

export default App;

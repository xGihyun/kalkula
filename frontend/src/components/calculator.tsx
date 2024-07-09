import { For, type JSX } from "solid-js";
import "mathlive";
import { mathFieldInput } from "@/lib/keyboard";
import { Workspace } from "@/types/data";
import { MathFieldProps } from "@/types/props";
import { setWorkspaces } from "@/lib/states";

type CalculatorProps = {
  workspace: Workspace;
};

export default function Calculator(props: CalculatorProps): JSX.Element {
  return (
    <section class="rounded-lg border bg-card flex flex-col flex-1 justify-end">
      <For each={props.workspace.equations}>
        {(eq, i) => (
          <MathField equation={eq} workspace={props.workspace} index={i()} />
        )}
      </For>
    </section>
  );
}

function MathField(props: MathFieldProps): JSX.Element {
  return (
    <div class="w-full odd:bg-secondary">
      <math-field
        class="px-10 py-2 w-full h-12 text-sm md:text-lg text-foreground bg-transparent"
        math-virtual-keyboard-policy="manual"
        ref={(el) => {
          setWorkspaces(
            (ws) => ws.id === props.workspace.id,
            "equations",
            props.index,
            "math_field_input",
            el,
          );
        }}
        onbeforeinput={(e) => mathFieldInput(e, props)}
        oninput={(e) => {
          const val = e.currentTarget.value;

          setWorkspaces(
            (ws) => ws.id === props.workspace.id,
            "equations",
            props.index,
            "content",
            val,
          );
        }}
      >
        {props.equation.content}
      </math-field>
    </div>
  );
}

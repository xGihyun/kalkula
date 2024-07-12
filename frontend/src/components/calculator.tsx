import { For, type JSX } from "solid-js";
import "mathlive";
import { mathFieldInput } from "@/lib/keyboard";
import { MathFieldProps } from "@/types/props";
import { useParams } from "@solidjs/router";
import { equations, setEquations } from "@/lib/states";

export default function Calculator(): JSX.Element {

  return (
    <section class="rounded-lg border bg-card flex flex-col flex-1 justify-end">
      <For each={equations}>
        {(eq, i) => <MathField equation={eq} index={i()} />}
      </For>
    </section>
  );
}

function MathField(props: MathFieldProps): JSX.Element {
  const params = useParams();

  console.log(params);

  return (
    <div class="w-full odd:bg-secondary">
      <math-field
        class="px-10 py-2 w-full h-12 text-sm md:text-lg text-foreground bg-transparent"
        math-virtual-keyboard-policy="manual"
        onbeforeinput={(e) => mathFieldInput(e, props)}
        oninput={(e) => {
          const val = e.currentTarget.value;

          setEquations((eq) => eq.id === props.equation.id, "content", val);
        }}
        ref={(el) => {
          setEquations(
            (eq) => eq.id === props.equation.id,
            "math_field_input",
            el,
          );
        }}
      >
        {props.equation.content}
      </math-field>
    </div>
  );
}

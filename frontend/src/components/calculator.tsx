import { For, Show, type JSX } from "solid-js";
import "mathlive";
import { mathFieldInput } from "@/lib/keyboard";
import { MathFieldProps } from "@/types/props";
import { equations, setEquations } from "@/lib/states";
import { evaluateEquations, evaluateVariable } from "@/lib/math";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RoundArrowRightIcon } from "@/assets/icons";

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
  return (
    <div class="w-full odd:bg-secondary relative">
      <math-field
        class="px-10 py-2 w-full min-h-12 h-auto text-sm md:text-lg text-foreground bg-transparent transition-colors border border-transparent peer"
        math-virtual-keyboard-policy="manual"
        onbeforeinput={(e) => {
          mathFieldInput(e, props);
          setEquations(
            (eq) => eq.id === props.equation.id,
            "previous_content",
            e.currentTarget.value,
          );
        }}
        oninput={(e) => {
          setEquations(
            (eq) => eq.id === props.equation.id,
            "content",
            e.currentTarget.value,
          );
          evaluateVariable(props.equation);
          evaluateEquations(equations);
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

      <span class="absolute left-0 top-1/2 -translate-y-1/2 h-full w-10 flex items-center opacity-0 peer-focus:opacity-100 transition-opacity">
        <RoundArrowRightIcon class="text-accent text-3xl md:text-4xl" />
      </span>

      <div class="absolute right-14 top-1/2 -translate-y-1/2 z-50 flex items-center h-full py-2">
        <Show
          when={props.equation.result}
          fallback={
            <math-field
              class="text-sm md:text-lg bg-transparent text-foreground"
              read-only
            >
              {props.equation.evaluation}
            </math-field>
          }
        >
          <Tooltip>
            <TooltipTrigger class="flex h-full items-center">
              {props.equation.result?.icon}
            </TooltipTrigger>
            <TooltipContent>{props.equation.result?.message}</TooltipContent>
          </Tooltip>
        </Show>
      </div>
    </div>
  );
}

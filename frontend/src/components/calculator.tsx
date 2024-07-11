import { For, type JSX } from "solid-js";
import "mathlive";
import { mathFieldInput } from "@/lib/keyboard";
import { CalculatorProps, MathFieldProps } from "@/types/props";
import { setWorkspaces } from "@/lib/states";
import { useParams } from "@solidjs/router";

export default function Calculator(props: CalculatorProps): JSX.Element {
	return (
		<section class="rounded-lg border bg-card flex flex-col flex-1 justify-end">
			<For each={props.equations}>
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
				ref={(el) => {
					setWorkspaces(
						(ws) => ws.id === params.id,
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
						(ws) => ws.id === params.id,
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

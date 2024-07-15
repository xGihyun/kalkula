import Calculator from "@/components/calculator";
import { evaluateEquations } from "@/lib/math";
import { equations, setEquations } from "@/lib/states";
import { loadEquations, saveEquations } from "@/server/equation";
import { useBeforeLeave, useParams } from "@solidjs/router";
import { createEffect, type JSX } from "solid-js";

export default function Page(): JSX.Element {
	const params = useParams();

	createEffect(async () => {
		console.log("Navigated");
		const eqs = await loadEquations(params.id);
		setEquations(eqs);
		evaluateEquations(eqs);
	});

	// TODO:
	// Perform a diff check between the loaded equations and the current equations,
	// if they're the same, there's no need to save
	useBeforeLeave(async () => {
		await saveEquations(params.id, equations);
	});

	return <Calculator />;
}

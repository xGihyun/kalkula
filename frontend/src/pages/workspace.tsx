import Calculator from "@/components/calculator";
import { evaluateEquations } from "@/lib/math";
import { equations, setEquations } from "@/lib/states";
import { toBackendEquations } from "@/lib/utils";
import { loadEquations, saveEquations } from "@/server/equation";
import { EventsEmit, EventsOn } from "@/wailsjs/runtime/runtime";
import { useBeforeLeave, useParams } from "@solidjs/router";
import { createEffect, type JSX } from "solid-js";

export default function Page(): JSX.Element {
	const params = useParams();

	EventsOn("beforeClose", () => {
		EventsEmit("saveEquations", params.id, toBackendEquations(equations));
	});

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

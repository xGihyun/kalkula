import { setEquations } from "@/lib/states";
import { GetEquations } from "@/wailsjs/go/backend/Equation";
import { RoutePreloadFuncArgs } from "@solidjs/router";

export async function preloadEquations({
	params,
}: RoutePreloadFuncArgs): Promise<void> {
	const eq = await GetEquations(params.id);

	setEquations(eq);

	console.log("Workspace: %s - Preloaded equations:", params.id, eq);
}

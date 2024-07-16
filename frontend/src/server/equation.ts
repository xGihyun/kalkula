import { toBackendEquations } from "@/lib/utils";
import { Equation } from "@/types/data";
import { GetEquations, SaveEquations } from "@/wailsjs/go/backend/Equation";
import { backend } from "@/wailsjs/go/models";

export async function loadEquations(id: string): Promise<backend.Equation[]> {
	const eq = await GetEquations(id);

	console.log("Workspace: %s - Preloaded equations", id);

	return eq;
}

export async function saveEquations(
	workspaceID: string,
	equations: Equation[],
) {
	const eq = toBackendEquations(equations);

	await SaveEquations(workspaceID, eq);

	console.log("Saved equations.");
}

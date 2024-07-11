import { GetEquations } from "@/wailsjs/go/backend/Equation";
import { backend } from "@/wailsjs/go/models";

export async function getEquations(
	workspace_id: string,
): Promise<backend.Equation[]> {
	const equations = await GetEquations(workspace_id);

	console.log("Equations:", equations);

	return equations;
}

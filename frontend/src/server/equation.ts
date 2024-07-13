import { GetEquations } from "@/wailsjs/go/backend/Equation";
import { backend } from "@/wailsjs/go/models";

export async function loadEquations(id: string): Promise<backend.Equation[]> {
  const eq = await GetEquations(id);

  console.log("Workspace: %s - Preloaded equations", id);

  return eq;
}

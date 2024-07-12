import { setWorkspaces, workspaces } from "@/lib/states";
import { CreateWorkspace, GetWorkspaces } from "@/wailsjs/go/backend/Workspace";

export async function loadWorkspaces(): Promise<void> {
	const workspaces = await GetWorkspaces();

	setWorkspaces(workspaces);

	console.log("Preloaded workspaces.");
}

export async function createWorkspace(): Promise<void> {
  const pos = workspaces.length + 1
  const ws = await CreateWorkspace(pos)

  setWorkspaces(workspaces.length, ws)

  console.log("Created workspace:", ws.id)
}

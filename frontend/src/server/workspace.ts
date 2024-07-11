import { GetWorkspaces } from "@/wailsjs/go/backend/Workspace";
import { backend } from "@/wailsjs/go/models";

export async function getWorkspaces(): Promise<backend.Workspace[]> {
	const workspaces = await GetWorkspaces();
	console.log("Workspaces:", workspaces);

	return workspaces;
}

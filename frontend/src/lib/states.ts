import { Workspace } from "@/types/data";
import { createStore } from "solid-js/store";

export const [workspaces, setWorkspaces] = createStore<Workspace[]>([]);

import { Equation } from "@/types/data";
import { backend } from "@/wailsjs/go/models";
import { createStore } from "solid-js/store";

export const [workspaces, setWorkspaces] = createStore<backend.Workspace[]>([]);
export const [equations, setEquations] = createStore<Equation[]>([]);

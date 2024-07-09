import { Workspace } from "@/types/data";
import { nanoid } from "nanoid";
import { createStore } from "solid-js/store";

export const [workspaces, setWorkspaces] = createStore<Workspace[]>([
  {
    id: nanoid(),
    position: 1,
    equations: [{ id: nanoid() }],
  },
]);

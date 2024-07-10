import { CalculatorIcon, PlusIcon, WorkspaceIcon } from "@/assets/icons";
import { For, type JSX } from "solid-js";
import { Button } from "./ui/button";
import { setWorkspaces, workspaces } from "@/lib/states";
import { nanoid } from "nanoid";
import type { Workspace } from "@/types/data";

export default function Workspaces(): JSX.Element {
	return (
		<section class="min-w-60 lg:w-60 bg-card rounded-lg border flex flex-col">
			<div class="bg-secondary px-3 py-4 flex items-center gap-2">
				<WorkspaceIcon class="text-accent text-2xl" />
				<span class="font-inter-semibold text-xl">Workspaces</span>
			</div>

			<div class="p-1 space-y-2">
				<For each={workspaces}>{(ws) => <Tab {...ws} />}</For>

				<CreateWorkspace />
			</div>
		</section>
	);
}

function Tab(props: Workspace): JSX.Element {
	return (
		<Button
			class="w-full justify-start gap-1 bg-card hover:bg-secondary"
			variant="secondary"
			// @ts-expect-error I don't know the proper type for this
			as={(p) => <a {...p} href={`/calculator?workspace=${props.id}`} />}
		>
			<CalculatorIcon class="text-accent text-lg" />
			<span class="font-inter-medium">
				{props.name || `Workspace ${props.position}`}
			</span>
		</Button>
	);
}

function CreateWorkspace(): JSX.Element {
	return (
		<Button
			class="w-full bg-transparent hover:bg-secondary"
			variant="secondary"
			onclick={createWorkspace}
		>
			<PlusIcon class="text-foreground text-lg" />
		</Button>
	);
}

function createWorkspace(): void {
	const ws: Workspace = {
		id: nanoid(),
		equations: [{ id: nanoid() }],
		position: workspaces.length + 1,
	};

	setWorkspaces(workspaces.length, ws);
}

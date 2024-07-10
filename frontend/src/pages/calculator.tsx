import { For, Show, type JSX } from "solid-js";
import Calculator from "@/components/calculator";
import Workspaces from "@/components/workspaces";
import { workspaces } from "@/lib/states";
import { isCurrentWorkspace } from "@/lib/utils";
import { loadWorkspaces } from "..";


export default function Page(): JSX.Element {
  loadWorkspaces()

  return (
    <div class="flex gap-2 h-full py-10 px-10">
      <Workspaces />

      <div class="flex flex-col gap-2 h-full w-full">
        <For each={workspaces}>
          {(ws) => {
            return (
              <Show when={isCurrentWorkspace(ws)}>
                <Calculator workspace={ws} />
              </Show>
            );
          }}
        </For>
        <Keyboard />
      </div>
    </div>
  );
}

function Keyboard(): JSX.Element {
  let kbd!: HTMLDivElement;

  return (
    <section class="overflow-hidden h-80 md:h-[26rem] rounded-lg bg-card shadow z-10 border">
      <div
        ref={(el) => {
          kbd = el;
          window.mathVirtualKeyboard.container = kbd;
          window.mathVirtualKeyboard.show();
        }}
        class="flex w-full h-full p-4"
      />
    </section>
  );
}

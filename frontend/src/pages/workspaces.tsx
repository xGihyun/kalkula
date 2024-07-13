import { onMount, type JSX } from "solid-js";
import Workspaces from "@/components/workspaces";
import "mathlive";
import { WithChildren } from "@/types/props";
import { loadWorkspaces } from "@/server/workspace";
import { useNavigate } from "@solidjs/router";
import { workspaces } from "@/lib/states";

export default function Page(props: WithChildren): JSX.Element {
  const navigate = useNavigate();

  onMount(async () => {
    await loadWorkspaces();

    navigate(`/workspaces/${workspaces[0].id}`);
  });

  return (
    <div class="flex gap-2 h-full py-10 px-10">
      <Workspaces />

      <div class="flex flex-col gap-2 h-full w-full">
        {props.children}
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

import Calculator from "@/components/calculator";
import { evaluateEquations } from "@/lib/math";
import { equations, setEquations } from "@/lib/states";
import { loadEquations } from "@/server/equation";
import { SaveEquations } from "@/wailsjs/go/backend/Equation";
import { backend } from "@/wailsjs/go/models";
import { useBeforeLeave, useParams } from "@solidjs/router";
import { createEffect, type JSX } from "solid-js";

export default function Page(): JSX.Element {
  const params = useParams();

  createEffect(async () => {
    console.log("Navigated");
    const eqs = await loadEquations(params.id);
    setEquations(eqs);
    evaluateEquations(eqs)
  });

  useBeforeLeave(async () => {
    const eq = equations
      .filter((eq) => eq.content)
      .map((eq) => {
        const b_eq: backend.Equation = {
          id: eq.id,
          content: eq.content,
        };

        return b_eq;
      });

    await SaveEquations(params.id, eq);

    console.log("Saved equations.");
  });

  return <Calculator />;
}

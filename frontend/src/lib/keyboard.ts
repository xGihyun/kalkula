import { MathFieldProps } from "@/types/props";
import { NewEquation } from "@/wailsjs/go/backend/Equation";
import { setEquations } from "./states";
import { Equation } from "@/types/data";
import { produce } from "solid-js/store";

export function mathFieldInput(e: InputEvent, props: MathFieldProps): void {
  console.log(e.inputType);
  console.log("MF:", props.equation.math_field_input?.value);
  console.log("Content:", props.equation.content);

  switch (e.inputType) {
    case "insertLineBreak":
      e.preventDefault();
      createMathField(props.index);
      break;
    case "deleteContentBackward":
      deleteMathField(props);
      break;
  }
}

async function createMathField(i: number): Promise<void> {
  const eq: Equation = await NewEquation();

  setEquations(produce((eqs) => eqs.splice(i + 1, 0, eq)));

  eq.math_field_input?.focus();
}

function deleteMathField(props: MathFieldProps): void {
  if (props.index < 1 || props.equation.content) return;

  setEquations(
    produce((eqs) => {
      eqs[props.index - 1].math_field_input?.focus();
      eqs.splice(props.index, 1);
    }),
  );
}

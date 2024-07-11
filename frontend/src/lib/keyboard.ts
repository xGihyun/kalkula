import { Equation } from "@/types/data";
import { MathFieldProps } from "@/types/props";
import { nanoid } from "nanoid";
//import { setWorkspaces } from "./states";
//import { produce } from "solid-js/store";

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
      //deleteMathField(props);
      break;
  }
}

function createMathField(_: number): void {
  const eq: Equation = {
    id: nanoid(),
  };

  //setWorkspaces(
  //  (ws) => ws.id === workspace.id,
  //  produce((ws) => {
  //    ws.equations.splice(index + 1, 0, eq);
  //  }),
  //);

  eq.math_field_input?.focus();
}

//function deleteMathField(props: MathFieldProps): void {
//  if (props.index < 1 || props.equation.content) return;
//
//  props.workspace.equations[props.index - 1].math_field_input?.focus();
//
//  setWorkspaces(
//    (ws) => ws.id === props.workspace.id,
//    produce((ws) => {
//      ws.equations.splice(props.index, 1);
//    }),
//  );
//}

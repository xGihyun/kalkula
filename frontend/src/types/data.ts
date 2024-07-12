import { backend } from "@/wailsjs/go/models";
import type { MathfieldElement } from "mathlive";
import type { JSX } from "solid-js";

export type EquationResult = {
  message: string;
  icon?: JSX.Element;
};

export type Equation = backend.Equation & EquationClient;

  // For client-side only
export type EquationClient = {
  evaluation?: number;
  result?: EquationResult;
  math_field_input?: MathfieldElement;
}

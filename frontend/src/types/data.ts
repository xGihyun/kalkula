import type { MathfieldElement } from "mathlive";
import type { JSX } from "solid-js";

export type EquationResult = {
  message: string;
  icon?: JSX.Element;
};

export type Equation = {
  // Stored data
  id: string;
  content?: string; // LaTex

  // For client-side only
  evaluation?: number;
  result?: EquationResult;
  math_field_input?: MathfieldElement;
};

export type Workspace = {
  id: string;
  name?: string;
  position: number;
  equations: Equation[];
};

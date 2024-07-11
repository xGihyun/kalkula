import type { JSX } from "solid-js";
import { Equation } from "./data";
import { backend } from "@/wailsjs/go/models";

export type MathFieldProps = {
  //workspace: Workspace;
  equation: Equation;
  index: number;
};

export type WorkspacesProps = {
  workspaces?: backend.Workspace[]
}

export type CalculatorProps = {
  equations?: backend.Equation[]
}

export type WithChildren = {
  children?: JSX.Element
}



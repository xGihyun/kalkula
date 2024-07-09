import type { MathfieldElement } from "mathlive";

export type MathRow = {
	id: number;
	math_field_input?: MathfieldElement;
	math_field_result?: MathfieldElement;
};

export type MathVariable = {
	symbol: string;
	value: string;
};


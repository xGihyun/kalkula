import { AssignSymbolError } from "@/types/error";
import { err, ok, Result } from "neverthrow";
import { ce, setEquations } from "./states";
import { MathVariable } from "@/types/math";
import { Equation, EquationResult } from "@/types/data";
import { RoundWarningIcon } from "@/assets/icons";
import { cn } from "./utils";

export function assignSymbol(
  symbol: string,
  value: string,
): Result<null, AssignSymbolError> {
  const val = getNumericValue(value);

  console.log("Assigning:", symbol, val)

  if (val === undefined) {
    console.log("Invalid assignment.")
    forgetSymbol(symbol);
    return err(AssignSymbolError.Invalid);
  }

  ce.assign(symbol, val)

  return ok(null);
}

function forgetSymbol(symbol: string) {
  ce.forget(symbol);
}

function getNumericValue(latex: string): number | undefined {
  const num = ce.parse(latex).evaluate().value;

  if ((num === undefined || Array.isArray(num) || num === false || latex === "")) {
    console.log("Invalid number:", num)
    return
  };

  // Converting to `number` is needed, otherwise, multiplication among variables will be parsed incorrectly
  // For example, `xy` will be parsed as `tuple` rather than `multiply`

  return Number(num);
}

export function getMathVariable(content?: string): MathVariable | undefined {
  if (!content) return;

  //const match = content.match(/(\w+)\s*=\s*(.*)/);
  //const match = content.match(/(\w+(?:_\{\w+\})?)\s*=\s*(\d+)/);
  const match = content.match(/(\w+(?:_\{\w+\})?)\s*=\s*(.*)/);

  console.log("Variable Match:", match);

  if (!match) return;

  let [, symbol, value] = match;

  // For variables that have alphabet character(s) as a subscript
  const braces = /[{}]/g;

  if (braces.test(symbol)) {
    symbol = symbol.replace(braces, "")
  }

  return {
    symbol,
    value,
  };
}

/*
A case wherein an equation's `content` contains a value of `y=5` (an initialized variable),
if `=` or `y` is deleted, then the variable would no longer be valid.
Since there's no way to identify which variable was deleted, we keep track of the equation's previous `content`
There are probably better ways to handle this case, but this works for now
*/
export function evaluateVariable(eq: Equation) {
  const curr = getMathVariable(eq.content);
  const prev = getMathVariable(eq.previous_content);

  if (!prev) return;

  if (!eq.content || !curr) {
    forgetSymbol(prev.symbol);
    setEquationResult(eq, undefined, undefined);
    return;
  }
}

export function evaluateEquations(equations: Equation[]): void {
  const symbols = new Set<string>();

  for (const eq of equations) {
    if (!eq.content) {
      console.log("No content.")
      setEquationResult(eq, undefined, undefined);
      continue;
    }

    const math_variable = getMathVariable(eq.content);

    if (!math_variable) {
      console.log("No variable.");
      const val = getNumericValue(eq.content);
      setEquationResult(eq, val, undefined);
      continue;
    }

    const { symbol, value } = math_variable;

    if (!Number.isNaN(Number(symbol))) {
      console.warn("Symbol NaN:", symbol);
      continue;
    }

    if (symbols.has(symbol)) {
      const message = `\`${symbol}\` is already defined.`;
      console.warn(message);

      setEquationResult(eq, undefined, {
        message,
        error: AssignSymbolError.Conflict,
      });
      continue;
    }

    symbols.add(symbol);

    const numeric_value = getNumericValue(value);
    const assign_symbol_result = assignSymbol(symbol, value);

    // TODO: Detect which variables are undefined in the current row
    if (assign_symbol_result.isErr()) {
      const message = `\`${symbol}\` is undefined.`;
      console.warn(message);

      setEquationResult(eq, undefined, {
        message,
        error: assign_symbol_result.error,
      });
      continue;
    }

    setEquationResult(eq, numeric_value, undefined);
  }
}

function setEquationResult(
  equation: Equation,
  evaluation?: number,
  result?: EquationResult,
): void {
  setEquations((eq) => eq.id === equation.id, "evaluation", evaluation);

  if (!result) {
    setEquations((eq) => eq.id === equation.id, "result", undefined);
    return;
  }

  let color = "";

  switch (result.error) {
    case AssignSymbolError.Conflict:
      color = "text-warning";
      break;
    case AssignSymbolError.Invalid:
      color = "text-destructive";
      break;
  }

  // NOTE: Change icons?
  const Icon = RoundWarningIcon({
    class: cn(color, "text-base md:text-xl"),
  });

  const res = {
    message: result.message,
    error: result.error,
    icon: Icon,
  };

  setEquations((eq) => eq.id === equation.id, "result", res);
}

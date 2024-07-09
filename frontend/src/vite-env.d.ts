/// <reference types="vite/client" />

import type { MathfieldElement } from "mathlive";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': JSX.HTMLAttributes<MathfieldElement>
    }
  }
}

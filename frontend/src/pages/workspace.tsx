import Calculator from "@/components/calculator";
import { getEquations } from "@/server/equation";
import { createAsyncStore, useParams } from "@solidjs/router";
import type { JSX } from "solid-js";

export default function Page(): JSX.Element {
	const params = useParams();
	const equations = createAsyncStore(() => getEquations(params.id));

	return <Calculator equations={equations()} />;
}

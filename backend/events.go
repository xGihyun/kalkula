package backend

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func StartEquationsEvent(ctx context.Context) {
	runtime.EventsOn(ctx, "saveEquations", func(optionalData ...interface{}) {
		workspaceID := optionalData[0].(string)
		equationsMap := optionalData[1].([]interface{})

		var equations []Equation

		for _, v := range equationsMap {
			eqMap := v.(map[string]interface{})

			eq := Equation{
				ID:      eqMap["id"].(string),
				Content: eqMap["content"].(string),
			}

			equations = append(equations, eq)
		}

		eq := new(Equation)
		eq.SaveEquations(workspaceID, equations)
	})
}

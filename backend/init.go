package backend

import (
	"context"
)

type Backend struct {
	RuntimeContext *context.Context
	Workspace      *Workspace
	Equation       *Equation
}

func NewBackend(ctx *context.Context) *Backend {

	return &Backend{
		RuntimeContext: ctx,
		Workspace:      &Workspace{},
		Equation:       &Equation{},
	}
}

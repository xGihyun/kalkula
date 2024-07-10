package backend

import (
	"context"
)

type Backend struct {
	ctx        *context.Context
	Workspaces *Workspaces
}

func NewBackend(ctx *context.Context) *Backend {
	return &Backend{
		ctx:        ctx,
		Workspaces: &Workspaces{},
	}
}

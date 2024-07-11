package main

import (
	"context"
	"kalkula/backend"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	backend.OpenConnection()
	backend.InitDB()
}

func (a *App) shutdown(ctx context.Context) {
	backend.DB.Close()
}

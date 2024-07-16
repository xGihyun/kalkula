package main

import (
	"context"
	"kalkula/backend"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"
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

func (a *App) beforeClose(ctx context.Context) bool {
	log.Print("App is closing!")

	runtime.EventsEmit(ctx, "beforeClose")
	backend.StartEquationsEvent(ctx)

	dialog, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:    runtime.QuestionDialog,
		Title:   "Quit Kalkula?",
		Message: "Are you sure you want to quit? Your equations will be saved.",
	})

	if err != nil {
		return false
	}

	return dialog != "Yes"
}

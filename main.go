package main

import (
	"embed"
	"kalkula/backend"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	backend := backend.NewBackend(&app.ctx)

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Kalkula",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 17, G: 17, B: 27, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			backend,
			backend.Workspace,
			backend.Equation,
		},
		OnShutdown:    app.shutdown,
		OnBeforeClose: app.beforeClose,
	})

	if err != nil {
		log.Fatal("Failed to start Kalkula:", err.Error())
	}
}

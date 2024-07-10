package backend

import (
	"fmt"
	"kalkula/backend/models"
	"log"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

type Workspaces struct {}

func (w *Workspaces) GetWorkspaces() ([]models.Workspace, error) {
	log.Print("Fetching workspaces...")

	var (
		workspaces []models.Workspace
		equations  []models.Equation
	)

	// TODO:
	// Get workspaces from database
	// If user has no workspaces on the database, return the default
	eq, err := newEquation()

	if err != nil {
		return nil, err
	}

	equations = append(equations, *eq)

	ws, err := newWorkspace(equations)

	if err != nil {
		return nil, err
	}

	workspaces = append(workspaces, *ws)

	log.Print("Fetched workspaces.")

	return workspaces, nil
}

func newWorkspace(eqs []models.Equation) (*models.Workspace, error) {
	id, err := gonanoid.New()

	if err != nil {
		return nil, fmt.Errorf("Failed to generate ID for workspace.")
	}

	ws := &models.Workspace{
		ID: id, Name: nil, Position: 1, Equations: eqs,
	}

	return ws, nil
}

func newEquation() (*models.Equation, error) {
	id, err := gonanoid.New()

	if err != nil {
		return nil, fmt.Errorf("Failed to generate ID for equation.")
	}

	eq := &models.Equation{
		ID: id, Content: nil,
	}

	return eq, nil
}

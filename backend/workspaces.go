package backend

import (
	"fmt"
	"log"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

type Workspace struct {
	ID       string  `json:"id"`
	Name     *string `json:"name"`
	Position int     `json:"position"`
}

func (w *Workspace) GetWorkspaces() ([]Workspace, error) {
	log.Print("Fetching workspaces...")

	var workspaces []Workspace

	query := "SELECT * FROM workspaces"
	rows, err := DB.Query(query)

	if err != nil {
		return nil, fmt.Errorf("Error during query: %s", err.Error())
	}

	defer rows.Close()

	for rows.Next() {
		var ws Workspace

		rows.Scan(&ws.ID, &ws.Name, &ws.Position)

		workspaces = append(workspaces, ws)
	}

	if rows.Err() != nil {
		return nil, fmt.Errorf("Error during rows iteration: %s", rows.Err().Error())
	}

  if len(workspaces) == 0 {
    log.Print("No workspaces.")

    if err := w.CreateWorkspace(0); err != nil {
      return nil, err
    }
  }

	log.Print("Fetched workspaces.")

	return workspaces, nil
}

func newWorkspace(name *string, pos int) (*Workspace, error) {
	id, err := gonanoid.New()

	if err != nil {
		return nil, fmt.Errorf("Failed to generate ID for workspace: %s", err.Error())
	}

	ws := &Workspace{
		ID: id, Name: name, Position: pos,
	}

	return ws, nil
}

func (w *Workspace) CreateWorkspace(len int) error {
  query := "INSERT INTO workspaces (id, name, position) VALUES (?, ?, ?)"

  ws, err := newWorkspace(nil, len + 1)

  if err != nil {
    return err
  }

  if _, err := DB.Exec(query, ws.ID, ws.Name, ws.Position); err != nil {
    return err
  }

  log.Print("Created new workspace.")

  return nil 
}

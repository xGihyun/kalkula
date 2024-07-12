package backend

import (
	"database/sql"
	"errors"
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

	log.Print("Fetched workspaces.")

	return workspaces, nil
}

func initWorkspaces(tx *sql.Tx) (initErr error) {

	query := "SELECT id FROM workspaces LIMIT 1"
	row := tx.QueryRow(query)

	var s string

	if err := row.Scan(&s); err != nil {
		if !errors.Is(err, sql.ErrNoRows) {
			return err
		}

		log.Print("No workspaces, initializing...")

		ws := new(Workspace)

		if err := ws.createWorkspaceTx(tx, 1); err != nil {
			return err
		}

		eq, err := NewEquation()

		if err != nil {
			return err
		}

		if err := eq.createEquationTx(tx); err != nil {
			return err
		}

		wseq := NewWorkspaceEquation(ws.ID, eq.ID)

		if err := wseq.createWorkspaceEquationTx(tx); err != nil {
			return err
		}

		return nil
	}

	log.Print("Initialized workspaces.")

	return nil
}

func (w *Workspace) NewWorkspace(pos int) error {
	id, err := gonanoid.New()

	if err != nil {
		return err
	}

	w.ID = id
	w.Position = pos

	return nil
}

func (w *Workspace) CreateWorkspace(pos int) (_ *Workspace, fnErr error) {
	if err := w.NewWorkspace(pos); err != nil {
		return nil, err
	}

	tx, err := DB.Begin()

	if err != nil {
		return nil, err
	}

  defer TxCommitOrRollback(tx, fnErr)

	query := "INSERT INTO workspaces (id, name, position) VALUES (?, ?, ?)"

	if _, err := DB.Exec(query, w.ID, w.Name, w.Position); err != nil {
		return nil, err
	}

	eq, err := NewEquation()

	if err != nil {
		return nil, err
	}

	if err := eq.createEquationTx(tx); err != nil {
		return nil, err
	}

	wseq := NewWorkspaceEquation(w.ID, eq.ID)

	if err := wseq.createWorkspaceEquationTx(tx); err != nil {
		return nil, err
	}

	log.Print("Created new workspace.")

	return w, nil
}

func (w *Workspace) createWorkspaceTx(tx *sql.Tx, pos int) error {
	if err := w.NewWorkspace(pos); err != nil {
		return err
	}

	query := "INSERT INTO workspaces (id, name, position) VALUES (?, ?, ?)"

	if _, err := tx.Exec(query, w.ID, w.Name, w.Position); err != nil {
		return err
	}

	log.Print("Created new workspace.")

	return nil
}

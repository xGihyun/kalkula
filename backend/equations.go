package backend

import (
	"database/sql"
	"fmt"
	"log"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

type Equation struct {
	ID      string `json:"id"`
	Content string `json:"content"`
}

func (e *Equation) GetEquations(workspaceID string) ([]Equation, error) {
  log.Printf("Fetching equations for workspace: %s", workspaceID)

	var equations []Equation

	query := `
  SELECT eq.* 
  FROM equations eq
  JOIN workspace_equations wseq ON wseq.equation_id = eq.id
  JOIN workspaces ws ON ws.id = wseq.workspace_id
  WHERE ws.id = ?
  `
	rows, err := DB.Query(query, workspaceID)

	if err != nil {
		return nil, fmt.Errorf("Error during query: %s", err.Error())
	}

	defer rows.Close()

	for rows.Next() {
		var eq Equation

		rows.Scan(&eq.ID, &eq.Content)

		equations = append(equations, eq)
	}

	if rows.Err() != nil {
		return nil, fmt.Errorf("Error during rows iteration: %s", rows.Err().Error())
	}

	log.Print("Fetched equations.")

	return equations, nil
}

func NewEquation() (*Equation, error) {
	id, err := gonanoid.New()

	if err != nil {
		return nil, err
	}

	eq := &Equation{
		ID: id, Content: "",
	}

	return eq, nil
}

func (e *Equation) CreateEquation() error {
	query := "INSERT INTO equations (id, content) VALUES (?, ?)"

	if _, err := DB.Exec(query, e.ID, e.Content); err != nil {
		return err
	}

	log.Print("Created new equation.")

	return nil
}

func (e *Equation) createEquationTx(tx *sql.Tx) error {
	query := "INSERT INTO equations (id, content) VALUES (?, ?)"

	if _, err := tx.Exec(query, e.ID, e.Content); err != nil {
		return err
	}

	log.Print("Created new equation.")

	return nil
}

type WorkspaceEquationReq struct {
	WorkspaceID string
	EquationID  string
}

func NewWorkspaceEquation(wsID string, eqID string) *WorkspaceEquationReq {
	wseq := &WorkspaceEquationReq{
		WorkspaceID: wsID,
		EquationID:  eqID,
	}

	return wseq
}

func (w *WorkspaceEquationReq) createWorkspaceEquation() error {
	query := "INSERT INTO workspace_equations (equation_id, workspace_id) VALUES (?, ?)"

	if _, err := DB.Exec(query, w.EquationID, w.WorkspaceID); err != nil {
		return err
	}

	log.Print("Created new workspace equation.")

	return nil
}

func (w *WorkspaceEquationReq) createWorkspaceEquationTx(tx *sql.Tx) error {
	query := "INSERT INTO workspace_equations (equation_id, workspace_id) VALUES (?, ?)"

	if _, err := tx.Exec(query, w.EquationID, w.WorkspaceID); err != nil {
		return err
	}

	log.Print("Created new workspace equation.")

	return nil
}

type PublicEquation struct {
	ID          int    `json:"id"`
	Description string `json:"description"`
	EquationID  string `json:"equation_id"`
}

type Variable struct {
	ID               int    `json:"id"`
	Variable         string `json:"variable"`
	Description      string `json:"description"`
	PublicEquationID int    `json:"public_equation_id"`
}

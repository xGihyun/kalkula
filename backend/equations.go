package backend

import (
	"fmt"
	"log"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

type Equation struct {
	ID      string  `json:"id"`
	Content *string `json:"content"`
}

func (e *Equation) GetEquations(workspaceID string) ([]Equation, error) {
	log.Print("Fetching equations...")

	var equations []Equation

	query := `
  SELECT eq.* 
  FROM equations eq
  JOIN workspace_equations wseq ON wseq.equation_id = eq.id
  `
	rows, err := DB.Query(query)

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

	if len(equations) == 0 {
		log.Print("No equations.")

		eq, err := e.CreateEquation()

		if err != nil {
			return nil, err
		}

		wseq := workspaceEquationReq{
			workspaceID: workspaceID,
			equationID:  eq.ID,
		}

		if err := createWorkspaceEquation(&wseq); err != nil {
			return nil, err
		}
	}

	log.Print("Fetched equations.")

	return equations, nil
}

func newEquation() (*Equation, error) {
	id, err := gonanoid.New()

	if err != nil {
		return nil, fmt.Errorf("Failed to generate ID for equation: %s", err.Error())
	}

	eq := &Equation{
		ID: id, Content: nil,
	}

	return eq, nil
}

func (e *Equation) CreateEquation() (*Equation, error) {
	query := "INSERT INTO equations (id, content) VALUES (?, ?)"

	eq, err := newEquation()

	if err != nil {
		return nil, err
	}

	if _, err := DB.Exec(query, eq.ID, eq.Content); err != nil {
		return nil, err
	}

	log.Print("Created new equation.")

	return eq, nil
}

type workspaceEquationReq struct {
	workspaceID string
	equationID  string
}

func createWorkspaceEquation(wseq *workspaceEquationReq) error {
	query := "INSERT INTO workspace_equations (equation_id, workspace_id) VALUES (?, ?)"

	if _, err := DB.Exec(query, wseq.equationID, wseq.workspaceID); err != nil {
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

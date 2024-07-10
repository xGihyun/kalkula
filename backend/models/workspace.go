package models

type Workspace struct {
	ID        string     `json:"id"`
	Name      *string     `json:"name"`
	Position  int        `json:"position"`
	Equations []Equation `json:"equations"`
}

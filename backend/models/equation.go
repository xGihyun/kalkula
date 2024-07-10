package models

type Equation struct {
	ID      string `json:"id"`
	Content *string `json:"content"`
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

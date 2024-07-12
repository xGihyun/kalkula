package backend

import (
	"database/sql"
	"log"
	"os"
	"strings"

	_ "github.com/tursodatabase/go-libsql"
)

var (
	DB *sql.DB
)

// Opens the connection to the database, both local and remote
func OpenConnection() {
	log.Print("Opening database connection...")

	dbFile := "file:./backend/dev/local.db"

	db, err := sql.Open("libsql", dbFile)

	if err != nil {
		log.Fatal("Failed to open database:", err.Error())
	}

	DB = db

	log.Print("Database connected.")
}

func InitDB() (initErr error) {
	log.Print("Initializing database...")

	data, err := os.ReadFile("./backend/sql/init.sql")

	if err != nil {
		log.Fatal("Failed to read SQL file: ", err.Error())
	}

	queries := strings.Split(string(data), "-- split")

	tx, err := DB.Begin()

	if err != nil {
		log.Fatal(err)
	}

	defer TxCommitOrRollback(tx, initErr)

	for _, q := range queries {
		_, err := tx.Exec(q)

		if err != nil {
			log.Fatal(err)
		}
	}

	log.Print("Created tables.")

	if err := initWorkspaces(tx); err != nil {
		log.Fatal(err)
	}

	log.Print("Initialized database.")

	return nil
}

func TxCommitOrRollback(tx *sql.Tx, err error) error {
	if err != nil {
		if err := tx.Rollback(); err != nil {
			return err
		}
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return nil
}

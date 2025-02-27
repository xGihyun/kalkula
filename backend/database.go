package backend

import (
	"database/sql"
	"log"
	"strings"

	_ "github.com/tursodatabase/go-libsql"
)

var (
	DB *sql.DB
)

// Opens the connection to the database, both local and remote
func OpenConnection() {
	log.Print("Opening database connection...")

  // Place it somewhere on the system
	// dbFile := "file:./backend/dev/local.db"
  dbFile := "file:/home/gihyun/Applications/local.db"

	db, err := sql.Open("libsql", dbFile)

	if err != nil {
		log.Fatal("Failed to open database:", err.Error())
	}

	DB = db

	log.Print("Database connected.")
}

func InitDB() (initErr error) {
	log.Print("Initializing database...")

  // Place it somewhere on the system
	// data, err := os.ReadFile("./backend/sql/init.sql")
	//
	// if err != nil {
	// 	log.Fatal("Failed to read SQL file: ", err.Error())
	// }

	queries := strings.Split(string(LOCAL_SQL), "-- split")

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
		log.Print("Error during transaction, rolling back...")

		if err := tx.Rollback(); err != nil {
			log.Print("Failed to rollback transaction.")
			return err
		}
	}

	if err := tx.Commit(); err != nil {
		log.Print("Failed to commit transaction.")
		return err
	}

	log.Print("Transaction committed")

	return nil
}

package backend

import (
	"log"
)

func LogError(err error) {
	log.Printf("ERROR - %s ->> %v", err.Error(), err)
}

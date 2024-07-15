package backend

import (
	"log"
)

func LogError(err error) error {
	log.Printf("ERROR - %s ->> %v", err.Error(), err)
  return err
}

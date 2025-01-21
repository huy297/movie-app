package auth

import (
	"database/sql"
)

func validateCredentials(db *sql.DB, username, password string) bool {
	var storedPassword string

	err := db.QueryRow("SELECT password FROM users WHERE username = ?", username).Scan(&storedPassword)
	if err != nil || storedPassword != password {
		return false
	}
	return true
}

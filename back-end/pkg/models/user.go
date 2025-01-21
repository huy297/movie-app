package models

import "time"

type User struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	Email     string    `json:"email"`
	Avatar    string    `json:"avatar"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	BirthDay  time.Time `json:"birth_day"`
}

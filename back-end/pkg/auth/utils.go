package auth

import (
	"auth-backend/pkg/models"

	"gorm.io/gorm"
)

func validateCredentials(db *gorm.DB, username, password string) bool {
	var user models.User
	err := db.Where("username = ?", username).Select("password").First(&user).Error
	if err != nil || user.Password != password {
		return false
	}
	return true
}

package auth

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func LoginHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username, password, ok := c.Request.BasicAuth()
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		if !validateCredentials(db, username, password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		}

		token, err := generateJWT(username)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		}

		c.JSON(http.StatusOK, gin.H{"token": token})

	}
}

func RegisterHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user struct {
			Username  string    `json:"username" binding:"required"`
			Password  string    `json:"password" binding:"required"`
			Email     string    `json:"email" binding:"required"`
			FirstName string    `json:"first_name" biding:"required"`
			LastName  string    `json:"last_name" biding:"required"`
			BirthDay  time.Time `json:"birth_day" biding:"required"`
		}
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		var exits bool
		err := db.QueryRow("SELECT COUNT(*) FROM users WHERE username = ?", user.Username).Scan(&exits)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database server error"})
			return
		}
		if exits {
			c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
			return
		}

		_, err = db.Exec("INSERT INTO users (username, password, email, first_name, last_name, birthday) VALUES (?, ?, ?, ?, ?, ?)", user.Username, user.Password, user.Email, user.FirstName, user.LastName, user.BirthDay)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "User registered"})
	}
}

func ProtectedHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		username, exists := c.Get("username")

		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message":  "You are authorized",
			"username": username,
		})
	}

}

func EditProfile(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username, exists := c.Get("username")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		query := "UPDATE users SET "
		type UpdateProfileRequest struct {
			FirstName string    `json:"first_name"`
			LastName  string    `json:"last_name"`
			BirthDay  time.Time `json:"birth_day"`
		}
		var req UpdateProfileRequest
		args := []interface{}{}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		if req.FirstName != "" {
			query += "first_name = ?, "
			args = append(args, req.FirstName)
		}
		if req.LastName != "" {
			query += "last_name = ?, "
			args = append(args, req.LastName)
		}
		if req.BirthDay != (time.Time{}) {
			query += "birthday = ?, "
			args = append(args, req.BirthDay)
		}
		query = query[:len(query)-2]

		query += " WHERE username = ?"
		args = append(args, username)

		_, err := db.Exec(query, args...)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Profile updated"})
	}
}

func UploadImageHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username, exists := c.Get("username")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized, No Username"})
			return
		}

		file, err := c.FormFile("avatar")

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		allowedExtensions := map[string]bool{"jpg": true, "jpeg": true, "png": true}
		fileExtension := strings.Split(file.Filename, ".")[1]
		if !allowedExtensions[fileExtension] {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file extension"})
			return
		}

		if file.Size > 2*1024*1024 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "File size too large"})
			return
		}

		avatarPath := fmt.Sprintf("./avatars/%s_%s", username, fileExtension)

		if err := c.SaveUploadedFile(file, avatarPath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
			return
		}

		avatarURL := fmt.Sprintf("http://localhost:8080/avatars/%s_%s", username, fileExtension)

		_, err = db.Exec("UPDATE users SET avatar = ? WHERE username = ?", avatarURL, username)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update avatar"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message":    "Avatar uploaded",
			"avatar_url": avatarURL,
		})
	}
}

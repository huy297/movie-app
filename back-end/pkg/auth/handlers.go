package auth

import (
	"auth-backend/pkg/models"
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

func LoginHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username, password, ok := c.Request.BasicAuth()
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		var user models.User
		err := db.Where("username = ?", username).First(&user).Error
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		if !validateCredentials(db, username, password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		}

		token, err := generateJWT(username, user.ID)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		}

		c.JSON(http.StatusOK, gin.H{"token": token})

	}
}

func RegisterHandler(db *gorm.DB, rdb *redis.Client, ctx context.Context) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		//  var count int64
		//  err := db.Model(&models.User{}).Where("username = ?", user.Username).Count(&count).Error
		//  if err != nil {
		//  	c.JSON(http.StatusInternalServerError, gin.H{"error": "Database server error"})
		//  return
		// }
		// if count > 0 {
		// 	c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		// 	return
		// }
		exists, err := rdb.SIsMember(ctx, "username", user.Username).Result()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Redis server error"})
			return
		}
		if exists {
			c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
			return
		}
		err = db.Create(&user).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
			return
		}
		rdb.SAdd(ctx, "username", user.Username)

		c.JSON(http.StatusCreated, gin.H{"message": "User registered"})
	}
}

func EditProfile(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		username, exists := c.Get("username")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		type UpdateProfileRequest struct {
			FirstName string    `json:"first_name"`
			LastName  string    `json:"last_name"`
			BirthDay  time.Time `json:"birth_day"`
		}
		var req UpdateProfileRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		updates := map[string]interface{}{}

		if req.FirstName != "" {
			updates["first_name"] = req.FirstName
		}
		if req.LastName != "" {
			updates["last_name"] = req.LastName
		}
		if req.BirthDay != (time.Time{}) {
			updates["birth_day"] = req.BirthDay
		}
		if len(updates) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
			return
		}

		err := db.Model(&models.User{}).Where("username = ?", username).Updates(updates).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Profile updated"})
	}
}

func UploadImageHandler(db *gorm.DB) gin.HandlerFunc {
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

		err = db.Model(&models.User{}).Where("username = ?", username).Update("avatar", avatarURL).Error
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

func GetFollowingList(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
			return
		}
		var followList []models.User
		err := db.Joins("JOIN follows ON users.id = follows.following_id").Where("follows.follower_id = ?", userID).Find(&followList).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get follow list"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"following_list": followList})
	}
}

func GetFollowedList(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
			return
		}
		var followList []models.User
		err := db.Joins("JOIN follows ON users.id = follows.follower_id").Where("follows.following_id = ?", userID).Find(&followList).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get follow list"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"followed_list": followList})
	}
}

func FollowUserHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		userID = int(userID.(float64))
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
			return
		}
		var followUserID int
		if err := c.ShouldBindJSON(&followUserID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		fmt.Println(userID)
		var follow models.Follow
		follow.FollowerID = userID.(int)
		follow.FollowingID = followUserID
		err := db.Create(&follow).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to follow user"})
			return
		}
	}
}

func UnfollowUserHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		UserID, exists := c.Get("user_id")
		UserID = int(UserID.(float64))
		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
			return
		}
		var followUserID int
		if err := c.ShouldBindJSON(&followUserID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		var follow models.Follow
		follow.FollowerID = UserID.(int)
		follow.FollowingID = followUserID
		err := db.Where("follower_id = ? AND following_id = ?", UserID, followUserID).Delete(&follow).Error
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unfollow user"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User unfollowed"})
	}
}

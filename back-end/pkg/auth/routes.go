package auth

import (
	"context"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

func RegisterRoutes(router *gin.Engine, db *gorm.DB, rdb *redis.Client, ctx context.Context) {
	router.POST("/login", LoginHandler(db))
	router.POST("/register", RegisterHandler(db, rdb, ctx))

	protected := router.Group("/auth-required")

	protected.Use(AuthenticateJWT())
	protected.PUT("/upload-avatar", UploadImageHandler(db))
	friendRoute := protected.Group("/friend")
	friendRoute.POST("/:user_id", FollowUserHandler(db))
	friendRoute.DELETE("/:user_id", UnfollowUserHandler(db))
}

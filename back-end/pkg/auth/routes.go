package auth

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine, db *sql.DB) {
	router.POST("/login", LoginHandler(db))
	router.POST("/register", RegisterHandler(db))

	protected := router.Group("/auth-required")

	protected.Use(AuthenticateJWT())
	protected.PUT("/upload-avatar", UploadImageHandler(db))
}

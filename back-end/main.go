package main

import (
	"auth-backend/pkg/auth"
	"auth-backend/pkg/database"
	"auth-backend/pkg/redis"
	"log"
	"net/http"

	"auth-backend/pkg/config"

	"github.com/gin-gonic/gin"
)

func main() {
	db := database.Connect(config.LoadConfig())
	rdb := redis.InitRedisClient()
	ctx := redis.GetContext()

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}
	defer sqlDB.Close()

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // Cho phép mọi domain (*)
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Xử lý preflight request (OPTIONS)
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	})

	auth.RegisterRoutes(r, db, rdb, ctx)

	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

package auth

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthenticateJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		fmt.Println("My token is", tokenString)
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized No Token"})
			c.Abort()
			return
		}

		claims := &jwt.MapClaims{}

		fmt.Println("My token is", tokenString)
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized Token Not Valid"})
			c.Abort()
		}
		c.Set("username", (*claims)["username"])
		fmt.Println("My user_id is", (*claims)["user_id"])
		c.Set("user_id", (*claims)["user_id"])
		c.Next()
	}
}

package models

import "time"

type Follow struct {
	ID          int       `json:"id" gorm:"primaryKey;autoIncrement"`
	FollowerID  int       `json:"follower_id" gorm:"not null;index"`
	FollowingID int       `json:"following_id" gorm:"not null;index"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
}

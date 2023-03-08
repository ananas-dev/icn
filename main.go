package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

type Player struct {
	ID     int
	Name   string
	Elo    sql.NullInt32
	ClubID int
	TeamID sql.NullInt32
}

type Game struct {
	ID        int
	Round     int
	Date      time.Time
	Board     int
	Result    string
	PlayerIDW sql.NullInt32
	PlayerIDB sql.NullInt32
	TeamIDW   int
	TeamIDB   int
}

type Team struct {
	ID       int
	Name     string
	Division int
	ClubID   int
}

type PlayerPage struct {
	Player Player
	Games  []Game
}

func playerByID(id int) (Player, error) {
	var player Player

	// Query for a value based on a single row.
	if err := DB.QueryRow("SELECT * FROM players WHERE player_id = ?", id).Scan(&player.ID, &player.Name, &player.Elo,
		&player.ClubID, &player.TeamID); err != nil {
		if err == sql.ErrNoRows {
			return Player{}, err
		}
		return Player{}, err
	}
	return player, nil
}

func getPlayerPage(id int) (Player, error) {
	var page PlayerPage

	// Query for a value based on a single row.
	if err := DB.QueryRow("SELECT * FROM players WHERE player_id = ?", id).Scan(&page.Player.ID, &page.Player.Name, &page.Player.Elo,
		&page.Player.ClubID, &page.Player.TeamID); err != nil {
		if err == sql.ErrNoRows {
			return Player{}, err
		}
		return Player{}, err
	}
	return player, nil
}

func index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.tmpl", gin.H{
		"title": "Main website",
	})
}

func player(c *gin.Context) {
	idString := c.Param("id")

	id, err := strconv.Atoi(idString)

	log.Println(id)

	if err != nil {
		// todo
	}

	player, err := playerByID(id)

	log.Println(player)

	if err != nil {
		// todo
	}

	c.HTML(http.StatusOK, "player.tmpl", gin.H{
		"name":   player.Name,
		"elo":    player.Elo.Int32,
		"clubId": player.ClubID,
	})

}

func main() {
	db, err := sql.Open("sqlite3", "./icn.sqlite")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	DB = db

	r := gin.Default()
	r.LoadHTMLGlob("templates/*")

	r.Static("/static", "./static")

	//r.GET("/index", index)
	r.GET("/player/:id", player)

	r.Run(":8080")
}

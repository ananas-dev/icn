package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

type Player struct {
	ID     int
	Name   string
	Elo    int
	ClubID int
	TeamID sql.NullInt32
}

type GameRow struct {
	ID      int
	Round   int
	Date    time.Time
	Board   int
	Result  string
	WhiteID sql.NullInt32
	BlackID sql.NullInt32
	TeamIDW int
	TeamIDB int
}

type Team struct {
	ID       int
	Name     string
	Division int
	ClubID   int
}

type GamePlayer struct {
	ID       int
	Name     string
	Elo      int
	TeamID   int
	TeamName string
}

type Game struct {
	ID     int
	Round  int
	Date   time.Time
	Board  int
	Result string
	White  GamePlayer
	Black  GamePlayer
}

type PlayerLite struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type PlayerPage struct {
	Player Player
	Games  []Game
}

func playerByID(id int) (Player, error) {
	var player Player

	if err := DB.QueryRow("SELECT * FROM players WHERE player_id = $1", id).Scan(&player.ID, &player.Name, &player.Elo,
		&player.ClubID, &player.TeamID); err != nil {
		if err == sql.ErrNoRows {
			return Player{}, err
		}
		return Player{}, err
	}
	return player, nil
}

func gamesById(id int) ([]Game, error) {
	rows, err := DB.Query(`
	SELECT 
		g.game_id, 
		g.game_round, 
		g.game_date, 
		g.game_board, 
		g.game_result, 
		pw.player_id, 
		pw.player_name, 
		pw.player_elo, 
		pb.player_id, 
		pb.player_name, 
		pb.player_elo, 
		tw.team_id, 
		tw.team_name, 
		tb.team_id, 
		tb.team_name 
	FROM 
		games AS g 
	LEFT JOIN players AS pw ON g.player_id_w = pw.player_id 
	LEFT JOIN players AS pb ON g.player_id_b = pb.player_id 
	LEFT JOIN teams AS tw ON g.team_id_w = tw.team_id 
	LEFT JOIN teams AS tb ON g.team_id_b = tb.team_id 
	WHERE 
		player_id_w = $1
		OR player_id_b = $1 
	ORDER BY 
		g.game_date
	`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var games []Game

	for rows.Next() {
		var gm Game
		if err := rows.Scan(
			&gm.ID,
			&gm.Round,
			&gm.Date,
			&gm.Board,
			&gm.Result,
			&gm.White.ID,
			&gm.White.Name,
			&gm.White.Elo,
			&gm.Black.ID,
			&gm.Black.Name,
			&gm.Black.Elo,
			&gm.White.TeamID,
			&gm.White.TeamName,
			&gm.Black.TeamID,
			&gm.Black.TeamName,
		); err != nil {
			fmt.Println(err)
			return games, err
		}
		games = append(games, gm)
	}
	if err = rows.Err(); err != nil {
		fmt.Println(err)
		return games, err
	}
	return games, nil
}

func searchPlayer(query string) ([]PlayerLite, error) {
	tokens := strings.Fields(query)

	var rows *sql.Rows
	var err error

	if len(tokens) == 1 {
		rows, err = DB.Query(`
		SELECT player_id, player_name
		FROM players
		WHERE player_name LIKE $1
		LIMIT 5
		`, "%"+tokens[0]+"%")
	} else if len(tokens) <= 2 {
		rows, err = DB.Query(`
		SELECT player_id, player_name
		FROM players
		WHERE player_name LIKE $1 AND player_name LIKE $2
		LIMIT 5
		`, "%"+tokens[0]+"%", "%"+tokens[1]+"%")
	}

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// An album slice to hold data from returned rows.
	var players []PlayerLite

	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var p PlayerLite
		if err := rows.Scan(&p.ID, &p.Name); err != nil {
			return players, err
		}
		players = append(players, p)
	}
	if err = rows.Err(); err != nil {
		return players, err
	}
	return players, nil
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

	games, err := gamesById(id)

	log.Println(games)

	if err != nil {
		// todo
	}

	c.HTML(http.StatusOK, "player.tmpl", gin.H{
		"Player": player,
		"Games":  games,
	})
}

type SearchQuery struct {
	Type  string `form:"t"`
	Query string `form:"q"`
}

func search(c *gin.Context) {
	var q SearchQuery

	if c.ShouldBind(&q) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "bad query parameters",
		})
		return
	}

	log.Println(q)

	players, err := searchPlayer(q.Query)

	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "error fetching data",
		})
		return
	}

	log.Println(players)

	c.JSON(http.StatusOK, players)
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
	r.GET("/api/search", search)

	r.Run(":8080")
}

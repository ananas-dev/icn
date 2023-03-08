from dbfread import DBF
import sqlite3


def main():
    conn = sqlite3.connect("icn.sqlite")
    cur = conn.cursor()

    cur.execute("DROP TABLE IF EXISTS clubs")
    cur.execute("""
    CREATE TABLE clubs (
        club_id INTEGER PRIMARY KEY
    )
    """)

    cur.execute("DROP TABLE IF EXISTS teams")
    cur.execute("""
    CREATE TABLE teams (
        team_id       INTEGER PRIMARY KEY AUTOINCREMENT,
        team_name     TEXT NOT NULL UNIQUE,
        team_division INTEGER NOT NULL,
        team_series   TEXT NOT NULL,
        club_id       INTEGER NOT NULL,
        FOREIGN KEY (club_id) REFERENCES clubs (club_id)
    )
    """)

    cur.execute("DROP TABLE IF EXISTS players")
    cur.execute("""
    CREATE TABLE players (
        player_id   INTEGER PRIMARY KEY,
        player_name TEXT NOT NULL,
        player_elo  INTEGER,
        club_id     INTEGER NOT NULL,
        team_id     INTEGER,
        FOREIGN KEY (club_id) REFERENCES clubs (club_id),
        FOREIGN KEY (team_id) REFERENCES teams (team_name)
    )
    """)

    cur.execute("DROP TABLE IF EXISTS games")
    cur.execute("""
    CREATE TABLE games (
        game_id          INTEGER PRIMARY KEY AUTOINCREMENT,
        game_round       INTEGER NOT NULL,
        game_date        TIMESTAMP,
        game_board       INTEGER NOT NULL,
        game_result      TEXT NOT NULL,
        player_id_w      INTEGER,
        player_id_b      INTEGER,
        team_id_w        INTEGER NOT NULL,
        team_id_b        INTEGER NOT NULL,
        FOREIGN KEY (player_id_w) REFERENCES players (player_id),
        FOREIGN KEY (player_id_b) REFERENCES players (player_id),
        FOREIGN KEY (team_id_w) REFERENCES teams (team_id),
        FOREIGN KEY (team_id_b) REFERENCES teams (team_id)
    )
    """)

    conn.commit()

    for record in DBF("IntNat/PrtIvICN.DBF"):
        team_name = record["EQUIPE_J"]
        team_division = record["DIVISION"]
        team_series = record["SERIE"]
        club_id = record["CLUB_ICN"]

        cur.execute("INSERT OR IGNORE INTO clubs VALUES (?)", (club_id,))

        team = (team_name, team_division, team_series, club_id)
        cur.execute("""INSERT OR IGNORE INTO teams (
            team_name,
            team_division,
            team_series,
            club_id
        ) VALUES (?, ?, ?, ?)""", team)

    conn.commit()

    for record in DBF("IntNat/LstForce.DBF"):
        player_id = record["MATRICULE"]
        player_name = record["NOM_PRENOM"]
        player_elo = record["ELO_ICN"]
        club_id = record["CLB_PLAYER"]
        if record["NOM_EQU"] == "":
            team_id = None
        else:
            team_name = record["NOM_EQU"]
            cur.execute(
                "SELECT team_id FROM teams WHERE team_name = ?", (team_name,))
            team_id = cur.fetchall()[0][0]

        player = (player_id, player_name, player_elo, club_id, team_id)
        cur.execute(
            "INSERT OR IGNORE INTO players VALUES (?, ?, ?, ?, ?)", player)

    conn.commit()

    for record in DBF("Datas/Part24L.DBF"):
        game_round = record["RONDE"]
        game_date = record["DATE"]
        game_board = record["TABLEAU"]
        game_result = record["RES"]
        player_id_w = record["MAT_B"]
        player_id_b = record["MAT_N"]
        team_name_w = record["EQUIPE_B"]
        team_name_b = record["EQUIPE_N"]

        cur.execute(
            "SELECT team_id FROM teams WHERE team_name = ?", (team_name_w,))
        team_id_w = cur.fetchall()[0][0]

        cur.execute(
            "SELECT team_id FROM teams WHERE team_name = ?", (team_name_b,))
        team_id_b = cur.fetchall()[0][0]

        if game_result == "½-½":
            game_result = "1/2-1/2"

        game = (game_round, game_date, game_board, game_result,
                player_id_w, player_id_b, team_id_w, team_id_b)
        cur.execute("""
        INSERT INTO games (
            game_round,
            game_date,
            game_board,
            game_result,
            player_id_w,
            player_id_b,
            team_id_w,
            team_id_b
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)""", game)

    conn.commit()


if __name__ == "__main__":
    main()

import sqlite3

conn = sqlite3.connect('beer_game.db', check_same_thread=False)

cur = conn.cursor()

def show_players():
    """
        Prints all the datas of Player table from the database
    """
    query=cur.execute("SELECT * FROM Player;")

    for row in query.fetchall():
        print(row)
    
    return 


def show_instructors():
    """
        Prints all the datas of Instructor table from the database
    """
    query=cur.execute("SELECT * FROM Instructor;")

    for row in query.fetchall():
        print(row)
    
    return 

def show_game():
    """
        Prints all the datas of Game table from the database
    """
    query=cur.execute("SELECT * FROM Game;")

    for row in query.fetchall():
        print(row)
    
    return 

def show_gameDets():
    """
        Prints all the datas of Game table from the database
    """
    query=cur.execute("SELECT * FROM Game_Details;")

    for row in query.fetchall():
        print(row)
    
    return 




def main():
    """
        Main Driver function which calls the three function to print data
    """
    print("\n\nData of Player Table:")
    show_players()

    print("\n\nData of Instructor Table:")
    show_instructors()

    print("\n\nData of Game Table:")
    show_game()

    print("\n\nData of Game Details Table:")
    show_gameDets()
main()

cur.close()

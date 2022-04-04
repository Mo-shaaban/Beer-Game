import sqlite3

class Connector:
    """Manage Databse connection."""

    def __init__(self):
        self.conn = sqlite3.connect('beer_game.db', check_same_thread=False)


    def add_player(self, name, email, password):
        """Add player to Player table.

        Args:
            name (string): name of the user
            email (string): emailaddress of the user
            password (string): password
        """
        cur = self.conn.cursor()

        emails=self.get_players()
        
        if email not in emails:
            cur.execute(
                "INSERT INTO Player(player_name, player_email\
                , player_password) VALUES (?, ?, ?);",
                (name, email, password)
            )
        else:
            return False

        self.conn.commit()
        cur.close()
        return True
    

    def add_instructor(self, name, email, password):
        """Add Instructor to Instructor table.

        Args:
            name (string): name of the user
            email (string): emailaddress of the user
            password (string): password
        """
        cur = self.conn.cursor()
        
        emails=self.get_instructors()
        
        if email not in emails:
            cur.execute(
                "INSERT INTO Instructor(ins_name, ins_email\
                , ins_password) VALUES (?, ?, ?);",
                (name, email, password)
            )
        else:
            return False

        self.conn.commit()
        cur.close()
        return True


    def get_players(self):
        """Get players.

        Returns:
            player[]: list of players email
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Player;"

        
        for row in cur.execute(query).fetchall():
            data.append(row[2])

        cur.close()
        return data


    def get_players_email_password(self):
        """Get players email, password

        Returns:
            [[email,password],..]
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Player;"

        for row in cur.execute(query).fetchall():
            test=[]
            test.append(row[2])
            test.append(row[3])
            data.append(test)

        cur.close()
        return data
    

    def get_players_id(self):
        """Get players id

        Returns:
            [id,..]
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Player;"

        for row in cur.execute(query).fetchall():
            data.append(row[0])

        cur.close()
        return data


    def get_instructors(self):
        """Get instructors email

        Returns:
            data[]: list of instructors email
        """

        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Instructor;"

        for row in cur.execute(query).fetchall():
            data.append(row[2])

        cur.close()
        return data


    def get_instructors_email_password(self):
        """Get instructorss email, password

        Returns:
            [[email,password],..]
        """

        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Instructor;"
        
        for row in cur.execute(query).fetchall():
            test=[]
            test.append(row[2])
            test.append(row[3])
            data.append(test)

        cur.close()
        return data
    

    def get_instructors_id(self):
        """Get instructorss id

        Returns:
            [List of instructors ids]
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Instructor;"

        for row in cur.execute(query).fetchall():
            data.append(row[0])

        cur.close()
        return data


    def add_game(self, game_id, game_password,number_of_rounds,upstream_delay,\
        downstream_delay,backlog_cost,inventory_cost,instructor_id):

        """
            Add Games to Game table using the arguments passed
        """
        cur = self.conn.cursor()

        games = self.get_gamecredentials()
        
        gamesid = []
        for x,y in games:
            gamesid.append(x)

        if game_id not in gamesid:
            cur.execute(
                "INSERT INTO Game(game_ID, game_password,num_rounds, upStream_delay, downStream_delay,backlog_cost,holding_cost,instructor_ID)\
                     VALUES (?, ?,?,?,?,?,?,?);",(game_id, game_password,number_of_rounds,upstream_delay,downstream_delay,backlog_cost,inventory_cost,instructor_id))
        else:
            return False

        self.conn.commit()
        cur.close()
        return True

    def update_game(self, game_id, game_password,number_of_rounds,upstream_delay,\
        downstream_delay,backlog_cost,inventory_cost,instructor_id):

        """
            updating a game that has already been added
        """
        cur = self.conn.cursor()

        games = self.get_gamecredentials()
        
        gamesid = []
        for x,y in games:
            gamesid.append(x)

        if game_id in gamesid:
            cur.execute(
                "UPDATE Game_Details SET number_of_rounds = ?, upstream_delay = ?, downstream_delay = ?, backlog_cost = ?, inventory_cost = ? WHERE game_ID=?\
                    ",(number_of_rounds,upstream_delay,downstream_delay,inventory_cost, cost,game_id))
        else:
            return False


        self.conn.commit()
        cur.close()
        return True

    def get_game_id(self):
        """
            Get game ID
        
        Returns:
            [game_id,..]
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Game;"

        for row in cur.execute(query).fetchall():
            data.append(row[0])

        cur.close()
        return data


    def get_gamecredentials(self):
        """Get game ID, game password
        
        Returns:
            [[game_id,game password],..]
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT game_ID, game_password FROM Game;"

        for row in cur.execute(query).fetchall():
            test=[]
            test.append(row[0])
            test.append(row[1])
            data.append(test)

        cur.close()
        return data


    def get_game_data(self):
        """Get all columns from game table
        
        Returns:
            [[game1],[game2]..]
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Game;"

        for row in cur.execute(query).fetchall():
            data.append(row)

        cur.close()
        return data

    

    def add_gameDet(self, game_id, player_ID, position,week,\
        Incoming_Demand,Incoming_Shipment, Total_Inventory, cost):

        """
            Add Games to Game table using the arguments passed
        """
        cur = self.conn.cursor()

        gameDets=self.get_gameDet()        
        gameDetsids = []
        id = game_id + position
        for row in gameDets:
            gameDetsid = row[0] + row[1]
        if game_id not in gameDetsids:
            cur.execute(
                "INSERT INTO Game_Details(game_ID, player_ID, week,Incoming_Demand,Incoming_Shipment,Total_Inventory, position, cost)\
                     VALUES (?, ?,?,?,?,?,?,?);",(game_id, player_ID,week,Incoming_Demand,Incoming_Shipment,Total_Inventory, position, cost))
        else:
            return False

        self.conn.commit()
        cur.close()
        return True

    

    def get_gameDet(self):
        """Get all columns from game table
        
        Returns:
            [[GameDet 1, GameDet2, ....]
        """
        data=[]
        cur = self.conn.cursor()
        query="SELECT * FROM Game_Details;"

        for row in cur.execute(query).fetchall():
            data.append(row)

        cur.close()
        return data

    def update_gameDet(self, game_id, player_ID, position,week,\
        Incoming_Demand,Incoming_Shipment, Total_Inventory, cost):

        """
            update the games details table that already exists
        """
        cur = self.conn.cursor()

        cur.execute(
            "UPDATE Game_Details SET week = ?, Incoming_Demand = ?, Incoming_Shipment = ?, Total_Inventory = ?, cost = ? WHERE game_ID=? and position = ?\
                ",(week,Incoming_Demand,Incoming_Shipment,Total_Inventory, cost,game_id,position))
        
        

        self.conn.commit()
        cur.close()
        return True

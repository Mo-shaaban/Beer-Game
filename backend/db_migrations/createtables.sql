CREATE TABLE Player(
    player_ID INTEGER PRIMARY KEY  AUTOINCREMENT,
    player_name VARCHAR(40) NOT NULL,
    player_email VARCHAR(40) UNIQUE,
    player_password VARCHAR(40) NOT NULL,
    current_game VARCHAR(40),
    inventory INTEGER,
    backorder INTEGER,
    downstream_player VARCHAR(40),
    upstream_player VARCHAR(40)
);


CREATE TABLE Instructor(
    ins_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    ins_name VARCHAR(40) NOT NULL,
    ins_email VARCHAR(40) UNIQUE,
    ins_password VARCHAR(40) NOT NULL,
    default_game VARCHAR(40)
);




CREATE TABLE Game(
    game_ID VARCHAR(40),
    distributor_present BOOLEAN,
    wholesaler_present BOOLEAN,
    holding_cost FLOAT,
    backlog_cost FLOAT,
    instructor_ID INTEGER,
    active BOOLEAN,
    info_sharing BOOLEAN,
    info_delay INTEGER,
    demand_id VARCHAR(40),
    weeks_completed INTEGER,
    is_default_game BOOLEAN,
    starting_inventory INTEGER,
    game_password VARCHAR(40),
    num_rounds INTEGER,
    upStream_delay INTEGER,
    downStream_delay INTEGER,
    PRIMARY KEY (game_ID)
);

CREATE TABLE Game_Details(
    game_ID VARCHAR(40),
    position VARCHAR(15),
    player_ID INTEGER,
    week INTEGER,
    Incoming_Demand INTEGER,
    Incoming_Shipment INTEGER,
    Total_Inventory INTEGER,
    cost INTEGER,
    PRIMARY KEY (game_ID, position),
    FOREIGN KEY (player_ID) 
        REFERENCES Player(player_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (game_ID) 
        REFERENCES Game(game_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    
);
CREATE TABLE demand_pattern(
    weeks INTEGER,
    owned_by VARCHAR(40),
    dname VARCHAR(40),
    dem_id INTEGER PRIMARY KEY AUTOINCREMENT
);


CREATE TABLE player_games(
    player_ID INTEGER,
    game_ID INTEGER,
    PRIMARY KEY (player_ID,game_ID),
    FOREIGN KEY (player_ID) 
        REFERENCES Player(player_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (game_ID) 
        REFERENCES Game(game_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE player_instructors(
    player_ID INTEGER,
    ins_ID INTEGER,
    PRIMARY KEY (player_ID,ins_ID),
    FOREIGN KEY (player_ID) 
        REFERENCES Player(player_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ins_ID) 
        REFERENCES Instructor(ins_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE instructor_games(
    game_ID INTEGER,
    ins_ID INTEGER,
    PRIMARY KEY (ins_ID,game_ID),
    FOREIGN KEY (game_ID) 
        REFERENCES Game(game_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ins_ID) 
        REFERENCES Instructor(ins_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE demand_games(
    game_ID INTEGER,
    dem_id  INTEGER,
    PRIMARY KEY (dem_id ,game_ID),
    FOREIGN KEY (game_ID) 
        REFERENCES Game(game_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (dem_id) 
        REFERENCES demand_pattern(dem_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

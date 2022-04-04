"""REST Server."""
from flask import Flask, request
from flask_cors import CORS
import json
from src.connection import Connector
from random import randint
import csv
app = Flask(__name__)
con = Connector()

CORS(app)



@app.route('/auth', methods=['POST'])
def authentication(name=None):
    """Verify player with name."""
    data = request.get_json()
    if (data['user_type']=="player"):
        lis = con.get_players_email_password()
        lis2=con.get_players_id()
        for index,x in enumerate(lis):
            if x[0]==data['email']:
                return json.dumps({"password": x[1],"id":lis2[index]})
        return json.dumps({"password": False})
    else:
        lis = con.get_instructors_email_password()
        lis2=con.get_instructors_id()
        for index,x in enumerate(lis):
            if x[0]==data['email']:
                return json.dumps({"password": x[1],"id":lis2[index]})
        return json.dumps({"password": False})


@app.route('/register', methods=['POST'])
def register_user():
    """
        Registers a new player or instructor according to the data passed in registration page
    """
    data = request.get_json()
    if (data['user_type']=="player"):
        result=con.add_player(data['name'], data['email'], data['password'])
        if result==False:
            return json.dumps({"success": False})
        else:
            return json.dumps({"success": True})
    else:
        result=con.add_instructor(data['name'], data['email'], data['password'])
        if result==False:
            return json.dumps({"success": False})
        else:
            return json.dumps({"success": True})

@app.route('/auth_game', methods=['POST'])
def authenticate_game(name=None):
    """Verify game with gameID and password."""
    data = request.get_json()

    lis=con.get_gamecredentials()
    for x in lis:
        if x[0]==data['game_id'] and x[1]==data['game_password']:
            return json.dumps({"success":True})
    return json.dumps({"success":False})


@app.route('/register_game', methods=['POST'])
def register_game(name=None):
    """Register new game with datas passed from the server."""
    data = request.get_json()

    lis=con.get_gamecredentials()

    for x in lis:
        if x[0]==data['game_id']:
            return json.dumps({"success":False})
    result=con.add_game(data['game_id'],data['game_password'],data['number_of_rounds'],data['upstream_delay'],data['downstream_delay'],data['backlog_cost'],data['inventory_cost'],data['instructor_id'])
    if result==False:
        return json.dumps({"success": False})
    else:
        return json.dumps({"success": True})

@app.route('/create_json', methods=['POST'])
def create_json(name=None):
    """Create JSON data for the all the game data of an instructor"""
    data = request.get_json()
    ins_id=int(data['instructor_id'])

    gamedatas=con.get_game_data()
    output_data=[]
    dic1={}

    for col in gamedatas:
        if col[5]==ins_id:
            dic1={}
            dic1['holding_cost']= col[3]
            dic1['backlog_cost']= col[4]
            dic1['game_ID']=col[0]
            dic1['weeks_completed']=0#col[10]
            dic1['upStream_delay']=col[15]
            dic1['downStream_delay']=col[16]
            dic1['total_cost']=0
            dic1['factory_cost']=0
            dic1['distributor_cost']=0
            dic1['wholesaler_cost']=0
            dic1['retailer_cost']=0
            output_data.append(dic1)

    with open ('../frontend/src/components/pages/MOCK_DATA.json', 'w') as outfile:
        json.dump(output_data,outfile)

    return {'succes':True}

@app.route('/playerscreen', methods=['POST'])
def playerscreen(name=None):
    """adding and managing player screen data"""

    data = request.get_json()
    
    """ for next sprint: connect the data of this function to playerscreen.js """
    
    game_id = "SO9gC" # put a game id that exists for the code to work
    player_id = 1
    position = "Factory"
    week = 1
    Incoming_Shipment = randint(0,50)
    Incoming_Demand = randint(0,50)
    data=con.get_gameDet()
    flag = False
    gamedet =[]
    total_inventory = 0
    cost = 0
    
    for x in data:
        # if the primary key existed, then don't add new data
        # instead, retrieve the data with the same primary key
        if (x[0]+x[1] == game_id + position):
            flag = True
            gamedet = x
            break

    if (not flag):
        # adding the data to the database
        total_inventory = Incoming_Shipment-Incoming_Demand
        if total_inventory>0:
            cost = total_inventory * 2
        else:
            cost = total_inventory * 2 * -1
        gamedet = [game_id, position, player_id, week, Incoming_Demand, Incoming_Shipment, total_inventory, cost]
        
        con.add_gameDet(game_id, player_id, position, week,Incoming_Demand,\
                Incoming_Shipment, total_inventory, cost)
    else:
        # updating data in the database
        total_inventory = gamedet[6] + Incoming_Shipment-Incoming_Demand
        if total_inventory>0:
            cost = total_inventory * 2
        else:
            cost = total_inventory * 2 * -1
        con.update_gameDet(game_id, player_id, position, gamedet[3]+1, Incoming_Demand,\
                Incoming_Shipment, total_inventory, cost)
        gamedet = [game_id, position, player_id, gamedet[3]+1, Incoming_Demand, Incoming_Shipment, total_inventory, cost]

        
    dic1 = {}
    dic1['game_id']= gamedet[0]
    dic1['position']= gamedet[1]
    dic1['player_id']=gamedet[2]
    dic1['week']=gamedet[3]
    dic1['Incoming_Demand']=gamedet[4]
    dic1['Incoming_Shipment']= gamedet[5]
    dic1['Total_Inventory']=gamedet[6]
    dic1['cost'] = gamedet[7]
         
    # putting all of the players game in a csv file
    # so the front end can use the data of multiple weeks        
    if (not flag):
        with open('../frontend/src/components/pages/Player_data.csv', 'w') as f:  
            w = csv.DictWriter(f, dic1.keys())
            w.writeheader()
            w.writerow(dic1)
    else:
        with open('../frontend/src/components/pages/Player_data.csv', 'a') as f:  
            w = csv.DictWriter(f, dic1.keys())
            w.writerow(dic1)

    return {'succes':True}


@app.route('/')
def welcome():
    """
        Default Home page of flask server
    """
    return 'Welcome!'

if __name__ == '__main__':
    app.run(port=8086, host='0.0.0.0')



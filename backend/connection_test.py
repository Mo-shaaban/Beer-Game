import unittest

import random
import string
from random import seed
from random import randint,uniform
import time

#to go back one directory
# import os,sys,inspect
# currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
# parentdir = os.path.dirname(currentdir)
# sys.path.insert(0,parentdir) 


from src.connection import Connector


class DatabaseOperationsTests(unittest.TestCase):

    def test_a_player_signup(self):
        """
            This automated function creates random data of players and registers them to database
            and checks whether the datas were succesfully added or not
        """
        random.seed(time.perf_counter())
        conn = Connector()

        print("\nAdding Players:")

        for _ in range (10): #testing 10 random player input
            
            name="ptest"
            
            #generate random password
            letters = string.ascii_letters 
            passw=( ''.join(random.choice(letters) for i in range(10)) )

            value=randint(0,100000)#generating random numbers
            name=name+ str(value)#adding number behind name to get unique names

            email=name+'@ptest.de'
            
            print(name,email,passw)

            result=conn.add_player(name, email, passw)

            with self.subTest(True):
                self.assertTrue(result)

                #to check again manually

                data = conn.get_players()
                emails1 = data
                self.assertTrue(email in emails1)

        
     

    
    def test_b_instructor_signup(self):
        """
            This automated function creates random data of instructors and registers them to database
            and checks whether the datas were succesfully added or not
        """
        conn = Connector()
        random.seed(time.perf_counter())
                
        print("\nAdding Instructors:")


        for _ in range (10):#testing 10 random instructor input
            name="itest"
            
            #generate random password
            letters = string.ascii_letters 
            passw=( ''.join(random.choice(letters) for i in range(10)) )

            value=randint(0,100000)#generating random numbers
            name=name+ str(value)#adding number behind name to get unique names

            email=name+'@itest.de'

            print(name,email,passw)

            result=conn.add_instructor(name, email, passw)
                
            with self.subTest(True):
                self.assertTrue(result)

                #to check again manually
                data2=conn.get_instructors()
                emails2 = data2
                self.assertTrue(email in emails2)

    def test_c_create_game(self):
        """
            This automated function creates random data of games and registers them to database
            and checks whether the datas were succesfully added or not
        """
        conn = Connector() 
        random.seed(time.perf_counter())
        

        print("\nAdding Games:")
    
        for _ in range(10):
            gameID_name="Test"

            game_ID_number=randint(0,100000)#generating random numbers
            gameID=gameID_name+ str(game_ID_number)

            password_name="Test"
            password_num=randint(100000,9999999)
            password=password_name+str(password_num)

            number_of_rounds=randint(0,100)
            upstream_delay=randint(0,10)
            downstream_delay=randint(0,10)
            backlog_cost=round(uniform(1,5),1)
            inventory_cost=round(uniform(1,5),1)
            instructor_ID=randint(0,1000000)

            result=conn.add_game(gameID, password,number_of_rounds,upstream_delay,\
            downstream_delay,backlog_cost,inventory_cost,instructor_ID) 
            print(gameID, password,number_of_rounds,upstream_delay,\
            downstream_delay,backlog_cost,inventory_cost,instructor_ID)

            with self.subTest(True):
                self.assertTrue(result)
                data2=conn.get_gamecredentials()
                gid=[]
                for x in data2:
                    gid.append(x[0])
                self.assertTrue(gameID in gid)

    def test_d_join_game(self):
        """
            This automated function uses random data of games and users
            and creates 4 positions for each game with differnt users
            and checks whether the datas were succesfully added or not
        """
        conn = Connector()
        random.seed(time.perf_counter())
        
        players_ID = conn.get_players_id() 
        games_ID = conn.get_game_id()
        positions = ["wholesaler", "factory", "retailer", "distributor"]
        print("\nAdding Games' Details:")
        for i in range(10):
            # choosing a random data for testing
            gameID = games_ID[randint(0,1000) % len(games_ID)]
            
                
            #using testing games only for testing different games
            while not gameID.startswith( 'Test' ):
                gameID = games_ID[randint(0,1000) % len(games_ID)]

            player_id = players_ID[i] 
            week = randint(1,50)
            Incoming_Demand = randint(0,50)
            Incoming_Shipment = randint(0,50)
            Total_Inventory = randint(-200,200)
            if Total_Inventory>0:
                cost = Total_Inventory * 2
            else:
                cost = Total_Inventory * 2 * -1
            position = positions [randint(0,3)]
            
            ''' 
            since the game gets gameid as foreign key
            the gameid + position doesn't have to be unique
            the next part of the code is for checking if it already existed
            and returns the data the existed instead
            '''
            data=conn.get_gameDet()
            flag = False
            gamedet =[]
            for x in data:
                # if the primary key existed, then update the data
                # else, add it to the table
                if (x[0]+x[1] == gameID + position):
                    flag = True
                    gamedet = x
                    break

            if (not flag):
                # adding the data if didn't exist before   
                result=conn.add_gameDet(gameID, player_id,position, week,Incoming_Demand,\
                Incoming_Shipment,Total_Inventory, cost)
                print(gameID, player_id, position, week,Incoming_Demand,\
                Incoming_Shipment,Total_Inventory, cost)
            else:
                # update the array if already existed
                result=conn.update_gameDet(gameID, player_id,position, week,Incoming_Demand,\
                Incoming_Shipment,Total_Inventory, cost)
                print(gameID, player_id, position, week,Incoming_Demand,\
                Incoming_Shipment,Total_Inventory, cost)
            

            with self.subTest(True):
                self.assertTrue(result)
                data2=conn.get_gameDet()
                id=[]
                
                for x in data2:
                    id.append(x[0]+x[1])
                self.assertTrue(gameID + position in id)

                # testing that all the values are correct
                # for both the inserting and the update gameDet
                for x in data2:
                    if (x[0]+x[1] == gameID + position):
                        self.assertEqual(x[3], week)
                        self.assertEqual(x[4], Incoming_Demand)
                        self.assertEqual(x[5], Incoming_Shipment)
                        self.assertEqual(x[6], Total_Inventory)
                        self.assertEqual(x[7], cost)
                        break

                
            
            # testing the update method
            week = randint(1,50)
            Incoming_Demand = randint(0,50)
            Incoming_Shipment = randint(0,50)
            Total_Inventory = randint(-200,200)




if __name__ == '__main__':
    unittest.main()

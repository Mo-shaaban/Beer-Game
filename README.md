# se-01-team-25

SE Sprint 01, Team 25

## General Info

For Sprint 1, our team decided to focus most of our effort on the frontend part of the application. For that, we used **ReactJs** to create the app and **CSS** for the styling. For the frontpage part, the login and signup pages are currently implemented.
We used **Django** for the backend, but much progress hasn't been made in this part. We have created the django project, which can be used in the future to add the backend logic according to the need.

## Directory Structure

The repo contains two folders: Frontend and Backend. Trivially, frontend contains the react app project and the backend contains the Django app project.

## Installation

Go the the local repository folder. Then run the following in command line:

```bash
cd frontend
npm install
```

## Usage

To start the server to render the app, enter the script in bash. The server should run at `localhost:3000` unless the port is already occupied by another app.

```bash
npm start
```

## Software Requirements

### Backend

**Django>=2.0** is installed

### Frontend

**NodeJS** installation was required in order to install **ReactJS**

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

# SE SPRINT 2 TEAM 25

## INDIVIDUAL CONTRIBUTIONS

## BACKEND:

    - Authentication of login and registration
    - Update the new users in the django administration for every new user and generates token
Available Script for Backend

```json

cd sprint2/backend/backendapi

python3 -m venv venv

pip install django djangorestframework django-cors-headers

python3 manage.py createsuperuser

python3 manage.py migrate

python3 manage.py runserver
```


## FRONTEND:

    - Modification of the login page: addition of Student/Instructor role, Fullname (instead of seperately)
    - Setup Game Settings page, where the instructor has the possibility of changing game settings provided in a table
    - Setup Game Options page for student, to choose between creating a game or joining one

# se-03-team-25

## Group Members
-------------
- Aabishkar Karki 
- Nayan Man Singh Pradhan

## Introduction
-------------
For this Sprint, we received a simple project with just a login and signup page built on React and CSS for frontend and no proper backend. Hence, first we connected the frontend to our database using Fask. After creating a functional backend, we changed the overall user interface for the web applciation by adding responsive and clean background and buttons with navbars and footers. Since the code we received only had 1 page (login/signup), we had to create several other pages such that the project is up to date with the Sprint. We added functions where Instructors can create and host games as well as monitor the games they created. We also added the functionality for Players to join a game created by the Insturctor and a Game Screen where the Players get an idea of how the game is played. 

## Architechture Notes
------------------
* The backend is written in Python and uses the Flask server
* For the Database we have used Sqlite for local testing
* The frontend is written REACT JS and has been served using a node.js server.
* The frontend communicates with the backend using REST architecture.

## Clone the github directory
---------------------------------------------
`git clone https://github.com/lorenzorota/se-03-team-25`

## Steps to setup & start the backend server
---------------------------------------------
* Make sure you have python virtual env installed. To install virtual env run `pip3 install virtualenv` 
* Create a virtual env in the root directory of the backend: `virtualenv venv`
* Switch to the venv: `source venv/bin/activate`
* Install all the python requirements: `pip3 install -r requirements.txt`
* Run the inital db migration from the root backend directory `yoyo apply`
* From the root backend directory run `python3 main.py`


## Steps to setup & start the frontend server
----------------------------------------
* Make sure you have `ReactJS` installed. 
* To install  `ReactJS` run `sudo apt install npm` and `sudo npm -g install create-react-app`
* In frontend directory install all the required packages using `npm install`.
* Run `npm start` to run in the development mode. 

## Steps to run the unit-tests
--------------------------
* From the backend directory run `python3 connection_test.py`

## Steps to see the data in database file
--------------------------------------
* From the backend root directory run `python3 view_table_data.py`

## Progress Report:
---------------------
- [x] We setup entire the backend using flask as the previous team just had the django server running and did nothing at the backend so we replaced it.
- [x] We setup SQL codes for the database inß backend/db_migrations.
- [x] We setup database in SQLITE3 for testing purposes.
- [x] We connected frontend to backend succesfully.
- [x] We added home page to the frontend and also the About Page and Instruction page.
- [x] We added a landing page for player after login where player can enter game credentials given by Instructor and go into the game.
- [x] We added a role choosing page for player inside a game which enables the player to choose a role once they login into the specific game.
- [x] We added a player screen page where the player can view the graphs and also the last weeks data and enter the beer they want to order and check if others have ordered beer or not. 
- [x] We added a landing page for instructor after login where the instructor can choose to either create a new game or view their currents games data.
- [x] We added a create game page for instructor where the instructor can create games which is directly stored in the database.
- [x] We added an instructors game viewing page where they can view datas of all their games which have been extracted real time from the database.
- [x] We connected view games page of Instructor to backend to extract real data.
- [x] We added backend testing which checks whether the registration of player, instructor and game is working correctly or not.
- [x] We added 4 frontend testing.
- [x] We used password hash instead of plaintext password for safety in frontend.
- [x] We did user authentication in login page such that only verified Players and Instructors can login.
- [x] We added new documentation called  'Sprint03_Documentation_Team25.pdf'.
- [x] We updated the Readme such that all the frontend, backend, testing can be easily run following the steps given and also wrote.
- [x] We changed the folder structure of the project to make it more professional than before.
- [x] We gave updates for the original requirements & system design document.


# se-04-team-25

## Group Members
-----------------
- Mohamed Ahmed Shaaban
- Nurgun Rafizade

## Introduction 
This sprint we received a codebase with properly working Signup/Login page and the frontend part for the the Player Screen. Thus, we decided to add backend functionality for adding, updating and retrieving game details. 

## Architecture Notes
------------------
* The backend is written in Python and uses the Flask server
* For the Database we have used Sqlite for local testing
* The frontend is written REACT JS and has been served using a node.js server.
* The frontend communicates with the backend using REST architecture.

## Clone the github directory
---------------------------------------------
`git clone https://github.com/lorenzorota/se-04-team-25`

## Steps to setup & start the backend server
---------------------------------------------
* Make sure you have python virtual env installed. To install virtual env run `pip3 install virtualenv` 
* Create a virtual env in the root directory of the backend: `virtualenv venv`
* Switch to the venv: `source venv/bin/activate`
* Install all the python requirements: `pip3 install -r requirements.txt`
* Run the inital db migration from the root backend directory `yoyo apply`
* From the root backend directory run `python3 main.py`

## Steps to setup & start the frontend server
----------------------------------------
* Make sure you have `ReactJS` installed. 
* To install  `ReactJS` run `sudo apt install npm` and `sudo npm -g install create-react-app`
* In frontend directory install all the required packages using `npm install`.
* Run `npm start` to run in the development mode. 

## Steps to run the unit-tests
--------------------------
* From the backend directory run `python3 connection_test.py`

## Steps to see the data in database file
--------------------------------------
* From the backend root directory run `python3 view_table_data.py`

## Progress Report:
- [x] We added a new Game Details table to the database
- [x] We added backend functions for updating the game
- [x] We added backend functions for adding game details
- [x] We added backend functions for updating game details
- [x] We added backend functions for retrieving game details from the database
- [x] We added backend functions for viewing game details
- [x] We added testing for adding/updating game details
- [x] We added a front-end button that connects to the backend of Player Screen
- [x] The game data is printed in the Player_data.csv file
- [x] Added the backend for Player Screen, the basic calculations and updating of the Game Details table and connecting its data to Player_data.csv ( The data is not connected to the frontend as of yet). **Note : The game_ID needs to be manually changed in the main.py for the data in the Player_data.csv to be correct**

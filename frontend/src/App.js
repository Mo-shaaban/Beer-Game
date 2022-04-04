import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
// import Instgameset from './components/pages/instgameset';
import Navbar from './components/Navbar';
// import { useState, useEffect } from 'react';
import Animation from "./components/pages/animation";
import PlayerLanding from "./components/pages/player_landing";
import Rolechoose from "./components/pages/rolechooose";
import Instructorlanding from "./components/pages/instructor_landing";
import ViewGame from "./components/pages/viewgame";
import CreateGame from "./components/pages/creategame";
import About from './components/pages/About';
import LearnMore from './components/pages/Learn_More';
import EditGameTable from "./components/pages/editgame_table";
import GameScreen from "./components/pages/playerscreen";


function App() {
  return (
    <>
      <Router>
      <Navbar/>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/player_landing'>
            <PlayerLanding />
          </Route>
          <Route path='/animation'>
            <Animation />
          </Route>
          <Route path='/rolechoose'>
            <Rolechoose />
          </Route>
          <Route path='/instructorlanding/:id'>
            <Instructorlanding />
          </Route>
          <Route path='/viewgame/:id'>
            <ViewGame />
          </Route>
          <Route path='/creategame/:id'>
            <CreateGame />
          </Route>
          <Route path='/About'>
            <About />
          </Route>
          <Route path='/Learn_More'>
            <LearnMore />
          </Route>
          <Route path='/editgametable'>
            <EditGameTable />
          </Route>
          <Route path='/playerscreen'>
            <GameScreen />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
export default App;
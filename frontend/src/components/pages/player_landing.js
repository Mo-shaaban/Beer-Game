import React, { useState } from "react";
import './Form.css';
// import { Link } from 'react-router-dom';
import axios from 'axios';


export default function PlayerLanding() {

    const [state, setState] = useState({
        game_ID: "",
        game_password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        // prevents the default form submit action to take place
    
        authenticate_game()
    
      }

      const authenticate_game = () => {
        axios.post('http://0.0.0.0:8086/auth_game',
          {
            game_id: state.game_ID,
            game_password: state.game_password,
          })
          .then(response => {
            // console.log(response.data)
            //do checking here to check if game credentials match-> if match redirect to role choose page
            var x = response.data

            console.log(x['success'])
    
            if (x['success']===false)
            {
              alert("Game not found!!!")
            }
            else
            {
                redirecttoRoleChoose();
            }
          })
          .catch(error => {
            console.log(error.response)
          });
    
      }

      const redirecttoRoleChoose=() => {
        // props.history.push('/display')
        window.location.replace('/rolechoose')
    }

    console.log(state);
    return (
        <>
            <video src = '/videos/video_landing_3.mp4' autoPlay loop muted />
            <div className='forms-container'>
                <div className="forms-content">
                    <form className='forms'>
                        <h1>Enter Game Credentials</h1>
                        <div className="forms-inputs">
                            <label htmlFor="game_id" className="forms-label">Game ID</label>
                            <input type="text" id="game_ID" name='game_ID' className='forms-input' value={state.game_ID} placeholder="Enter Game ID" onChange={handleChange} required></input>
                        </div>
                        <div className="forms-inputs">
                            <label htmlFor="password" className="forms-label">Game Password</label>
                            <input type='password' id="game_password" name='game_password' value ={state.game_password} className='forms-input' placeholder="Enter game password" onChange={handleChange} required></input>
                        </div>
                        <button id="Button" className='forms-input-btn' type='submit' onClick={handleSubmitClick}>Enter Game</button>
                    </form>
                </div>
            </div>
        </>
    );
}
import React, { useState } from "react";
import './Form.css';
import axios from 'axios';
// import {BrowserRouter as Router} from 'react-router-dom';
import {useParams } from 'react-router-dom'

export default function CreateGame() {
    const {id}=useParams()
   
    var ins_id=id;
    console.log(ins_id)
    
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    var g_id = makeid();

    const [state, setState] = useState({
        game_ID: g_id,
        game_password: "",
        number_of_rounds:"",
        upstream_delay:"",
        downstream_delay:"",
        backlog_cost:"",
        inventory_cost:"",
        instructor_id:ins_id
    })


    console.log(state);

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
        axios.post('http://0.0.0.0:8086/register_game',
            {
                game_id: state.game_ID,
                game_password: state.game_password,
                number_of_rounds:state.number_of_rounds,
                upstream_delay:state.upstream_delay,
                downstream_delay:state.downstream_delay,
                backlog_cost:state.backlog_cost,
                inventory_cost:state.inventory_cost,
                instructor_id:state.instructor_id
            })
            .then(response => {
                // console.log(response.data)
                //do checking here to check if game credentials match-> if match redirect to role choose page
                var x = response.data

                console.log(x['success'])

                if (x['success'] === false) {
                    alert("Game could not be created! Please refresh the page and try again!")
                }
                else {
                    alert("Succesfull Game Created");
                    redirecttoinstructorlanding();
                }
            })
            .catch(error => {
                console.log(error.response)
            });

    }

    const redirecttoinstructorlanding = () => {
        var ids=state.instructor_id;
        var url="/instructorlanding/"+ids;
        console.log(url);
        window.location.replace(url)
    }

    return (
        <>
        <video src = '/videos/video_landing_2.mp4' autoPlay loop muted />
            <div className='forms-container-new'>
                <div className="forms-content">
                    <form className='forms' onSubmit={handleSubmitClick}>
                        <h1>Enter Game Data</h1>

                        {/* Auto generated unique game id */}
                        <div className="forms-inputs">
                            <label htmlFor="game_id" className="forms-label">Unique Game ID</label>
                            <input type="text" name='game_ID' className='forms-input' placeholder="Enter Game ID" value={state.game_ID} readOnly></input>
                        </div>

                        {/* Input for Number of Rounds */}
                        <div className="forms-inputs">
                            <label htmlFor="number_of_rounds" className="forms-label">Number of Rounds</label>
                            <input type="number" name='number_of_rounds' className='forms-input' placeholder="Enter Number of Rounds" onChange={handleChange} required min='1'></input>
                        </div>

                        {/* Input for Upstream Delay */}
                        <div className="forms-inputs">
                            <label htmlFor="upstream_delay" className="forms-label">Up Stream Delay</label>
                            <input type="number" name='upstream_delay' className='forms-input' placeholder="Enter Up Stream Delay Time" onChange={handleChange} required min='1'></input>
                        </div>

                        {/* Input for Down Stream Delay */}
                        <div className="forms-inputs">
                            <label htmlFor="downstream_delay" className="forms-label">Down Stream Delay</label>
                            <input type="number" name='downstream_delay' className='forms-input' placeholder="Enter Down Stream Delay Time" onChange={handleChange} required min='1'></input>
                        </div>

                        {/* Input for Backlog Cost */}
                        <div className="forms-inputs">
                            <label htmlFor="backlog_cost" className="forms-label">Backlog Cost</label>
                            <input type="number" name='backlog_cost' className='forms-input' placeholder="Enter Backlog Cost" onChange={handleChange} required min='0' step="any"></input>
                        </div>

                        {/* Input for Inventory Cost */}
                        <div className="forms-inputs">
                            <label htmlFor="inventory_cost" className="forms-label">Inventory Cost</label>
                            <input type="number" name='inventory_cost' className='forms-input' placeholder="Enter Inventory Cost" onChange={handleChange} required min='0' step="any"></input>
                        </div>

                        {/* Input for Game Password */}
                        <div className="forms-inputs">
                            <label htmlFor="password" className="forms-label">Game Password</label>
                            <input type='password' name='game_password' className='forms-input' placeholder="Enter Password for Game" onChange={handleChange} required></input>
                        </div>
                        <button className='forms-input-btn' type='submit'>Create Game</button>
                    </form>
                </div>
            </div>
        </>
    );
}


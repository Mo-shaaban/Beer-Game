import React from "react";
import axios from 'axios';

const bcrypt = require('bcryptjs');

export class Login extends React.Component {
  state = {
    credentials: { email: "", password: "", user_type: "" }
  }

  authenticate_user = () => {
    axios.post('http://0.0.0.0:8086/auth',
      {
        name: this.state.credentials.name,
        email: this.state.credentials.email,
        user_type: this.state.credentials.user_type
      })
      .then(response => {
        // console.log(response.data)

        var x = response.data

        console.log(x['password'])

        if (x['password'] === false) {
          alert("User not registered!!!")
        }
        else {
          const doesPasswordMatch = bcrypt.compareSync(this.state.credentials.password, x['password'])

          if (doesPasswordMatch) { //if passwords match
            console.log({ "Hello": x['id'] });
            this.redirectTolanding(x['id']);
          }
          else {
            alert("Wrong Password!!")
          }
        }
      })
      .catch(error => {
        console.log(error.response)
      });

  }

  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  }


  handleSubmitClick = (e) => {
    e.preventDefault();
    // prevents the default form submit action to take place
    this.authenticate_user()

  }

  redirectTolanding = (data) => {
    if (this.state.credentials.user_type === "player") {
      window.location.replace('/player_landing')
    }
    else {
      var id = data;
      var url = "/instructorlanding/" + id;
      console.log(url);

      window.location.replace(url)
    }


  }

  render() {
    console.log(this.state.credentials);
    return (
      <div className="base-container">
        <div className="header">BEERGAME</div>
        <div className="content">
          <div>Login</div>
          <form className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email"
                value={this.state.credentials.email}
                onChange={this.inputChanged}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={this.state.credentials.password}
                onChange={this.inputChanged}
                required
              />
            </div>
            <div>
              <p>Select the role:</p>
              <input type="radio" name="user_type" value="player" onChange={this.inputChanged} required />
              <label htmlFor="player">Player</label>
              <input type="radio" name="user_type" value="instructor" onChange={this.inputChanged} />
              <label htmlFor="instructor">Instructor</label>
            </div>
            <div className="footer">
              <button onClick={this.authenticate_user} id="Button" type="button" className="btn">
                Login
              </button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

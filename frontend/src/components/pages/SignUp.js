import React from "react";
import axios from 'axios';

const bcrypt = require('bcryptjs');

export class Register extends React.Component {

  state = {
    credentials: { name: "", email: "", password: "", confirm_password: "", user_type: "" }
  }

  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  }


  sendDetailsToServer = () => {
    axios.post('http://0.0.0.0:8086/register',
      {
        name: this.state.credentials.name,
        email: this.state.credentials.email,
        password: bcrypt.hashSync(this.state.credentials.password, bcrypt.genSaltSync()),
        user_type: this.state.credentials.user_type
      })
      .then(response => {
        // console.log(response.data)

        var x = response.data

        console.log(x['success'])

        if (x['success'] === true) {
          alert("Sucess")
          //redirect to home page later on once it is created
          this.redirectToLogin()
        }
        else {
          alert("Failure")
        }
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  handleSubmitClick = (e) => {
    e.preventDefault();
    // prevents the default form submit action to take place
    if (this.state.credentials.password === this.state.credentials.confirm_password) {
      this.sendDetailsToServer()

    } else {
      alert('Passwords do not match');
    }

  }

  redirectToLogin = () => {
    window.location.replace('/animation')

  }


  render() {
    console.log(this.state.credentials);
    return (
      <>
        <div className="base-container">
          <div className="header">BEERGAME</div>
          <div className="content">
            <div>Register</div>
            <form className="form" onSubmit={this.handleSubmitClick}>

              <div className="form-group">
                <label htmlFor="name"> Fullname</label>
                <input type="text" id="name" name="name" placeholder="fullname"
                  value={this.state.credentials.name}
                  onChange={this.inputChanged} 
                  required/>
              </div>


              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="email"
                  value={this.state.credentials.email}
                  onChange={this.inputChanged} 
                  required/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder="password"
                  value={this.state.credentials.password}
                  onChange={this.inputChanged} 
                  required/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" placeholder="re-enter password"
                  value={this.state.credentials.confirm_password}
                  onChange={this.inputChanged} 
                  required/>
              </div>
              <div>
                <p>Select the role:</p>
                <input type="radio" name="user_type" value="player" onChange={this.inputChanged} required />
                <label for="player">Player</label>
                <input type="radio" name="user_type" value="instructor" onChange={this.inputChanged} />
                <label for="instructor">Instructor</label>
              </div>
              <div className="footer">
                <button  id="Button" type="submit" className="btn">
                  Register
                </button>
              </div>
            </form>
          </div>

        </div>
      </>
    );
  }
}

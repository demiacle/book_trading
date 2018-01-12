import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props){
    super(props)
    console.log('constructor props are ')
    console.log(props)
    this.state = {
      test: props.test
    }
  }
  render() {
    return (
      <div className="Home">
        <div id="indexTop">
          <div id="graphic">
            <h1>Book&middot;My&middot;Life</h1>
            <h2>Trade books the easy way!</h2><img id="tree" src="trees_cm-.png" alt="site icon" />
          </div>
          <p id="builtBy">built by Daniel Escobedo:@Demiacle using such and such</p>
        </div>
        <div id="indexBottom">
          <div id="registerForm">
            <h3>Register</h3>
            <form action="auth" method="post">
              <input type="text" name="user" placeholder="name" />
              <input type="text" name="password" placeholder="password" />
              <input type="submit" value="Register" />
            </form>
          </div>
          <div id="loginForm">
            <h3>Login</h3>
            <form action="auth" method="post">
              <input type="text" name="user" placeholder="name" />
              <input type="text" name="password" placeholder="password" />
              <input type="submit" value="Login" />
            </form>
          </div>
          <p className="sub">*for demo purposes, registering any name/password will work as long as it is not already taken</p>
        </div>
      </div>
    );
  }
}

export default Home;

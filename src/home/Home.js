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
    console.log(this.props)
    return (
      <div className="Home">
        <div id="indexTop">
          <div id="graphic">
            <h1>Book&middot;My&middot;Life</h1>
            <h2>Trade books the easy way!</h2><img id="tree" src="trees_cm-.png" alt="site icon" />
          </div>
          <p id="builtBy">Built by Daniel Escobedo:<a href="https://twitter.com/Demiacle?lang=en">@Demiacle</a> using <a href="https://reactjs.org/">React</a>, <a href="https://github.com/jaredpalmer/razzle">Razzle</a>, and <a href="https://github.com/expressjs/express">Express</a></p>
        </div>
        <div id="indexBottom">
          <div id="registerForm">
            <h3>Register</h3>
            <form action="/register" method="post">
              <input type="text" name="user" placeholder="name" required/>
              <input type="text" name="password" placeholder="password" required/>
              <input type="submit" value="Register" />
            </form>
          </div>
          { this.props.isLoggedIn}
          <div id="loginForm">
            <h3>Login</h3>
            <form action="/login" method="post">
              <input type="text" name="user" placeholder="name" required/>
              <input type="text" name="password" placeholder="password" required/>
              <input type="submit" value="Login" />
            </form>
          </div>
          <p className="sub">*for demo purposes, registering any name/password will work as long as an identicle combination does not already taken</p>
        </div>
      </div>
    );
  }
}

export default Home;

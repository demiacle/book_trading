import React, { Component } from 'react';
import logo from '../react.svg';
import './Home.css';

class Home extends Component {
  constructor(props){
    super(props)
    console.log('constructor props are ')
    console.log(props)
  }
  render() {
    console.log( 'component has this data')
    console.log( this.props )
    console.log( this.state )
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to HOME PAGE and props are</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;

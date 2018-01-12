import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="Home">
        <h1>profile page</h1>
        <p>allow update of the following:</p>
        <p>first/last name</p>
        <p>city</p>
        <p>state</p>
        <p>user name</p>
        <p>password</p><br /><br /><br /><br />
        <p>books traded</p>
        <p>requests made BY you</p>
        <p>requests made TO you</p>
      </div>
    );
  }
}

export default Profile;

import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.updateProfile = this.updateProfile.bind(this)
    this.state = {
      isShowingModal: false
    }
  }

  showModal() {
    this.setState((prev) => {
      return {
        isShowingModal: !prev.isShowingModal,
        field: 'test',
        value: 'yip'
      }
    })
  }

  updateProfile(){
    /*
    fetch('/update-profile', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify()
    })
    .then()
    */
  }

  render() {
    var profile = this.props.profile;
    return (
      <div>
        <h1>Your Profile</h1>
        <div id="profile-container">
          {this.state.isShowingModal ? <EditPromt field={this.state.field} /> : ''}
          <form id="profile-form" method="POST" action="/update-profile">
            <label htmlFor="first-name">First name:</label>
            <input id="first-name" name="firstName" placeholder={profile.firstName}></input>

            <label htmlFor="last-name">Last name:</label>
            <input id="last-name" name="lastName" placeholder={profile.lastName}></input>

            <label htmlFor="city">city:</label>
            <input id="city" name="city" placeholder={profile.city}></input>

            <label htmlFor="state">state:</label>
            <input id="state" name="state" placeholder={profile.state}></input>

            <label htmlFor="user-name">user name:</label>
            <input id="user-name" name="userName" placeholder={profile.userName}></input>
            
            <label htmlFor="password">password:</label>
            <input id="password" name="password" placeholder="*****"></input>
            <div></div>
            <button id="save-button" type="submit" onClick={this.updateProfile}>Save</button>
          </form>
          <div id="profile-stats">
          <p id="books-traded">Amount of books traded: {profile.booksTraded}</p>
          <p id="requests-made">Amount of requests you've made: {profile.requestsMade}</p>
          <p id="requests-received">Amount of requests to trade with you: {profile.requestsReceived}</p>
          </div>
          <form id="add-book-form" action="/google-books" method="GET">
            <input type='text' name="search" placeholder="Search..." required />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    );
  }
}

class EditPromt extends Component {
  render() {
    return <div>
      <form>
        <label>{this.props.field}
          <input type='text' placeholder={this.props.value} />
        </label>
      </form>
    </div>
  }
}

export default Profile;

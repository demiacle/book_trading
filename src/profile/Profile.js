import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props)
    console.log(props)
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

  render() {
    var profile = this.props.profile;
    return (
      <div>
        <h1>Your Profile</h1>
        <div id="profile-container">
          {this.state.isShowingModal ? <EditPromt field={this.state.field} /> : ''}
          <form id="profile-form">
            <label htmlFor="first-name">First name:</label>
            <input id="first-name "defaultValue={profile.firstName}></input>

            <label htmlFor="last-name">Last name:</label>
            <input id="last-name" defaultValue={profile.lastName}></input>

            <label htmlFor="city">city:</label>
            <input id="city" defaultValue={profile.city}></input>

            <label htmlFor="state">state:</label>
            <input id="state" defaultValue={profile.state}></input>

            <label htmlFor="user-name">user name:</label>
            <input id="user-name" defaultValue={profile.userName}></input>
            
            <label htmlFor="password">password:</label>
            <input id="password" placeholder="*****"></input>
            <div></div>
            <button id="save-button" onClick={this.showModal}>Save</button>
          </form>
          <div id="profile-stats">
          <p id="books-traded">Amount of books traded: {profile.booksTraded}</p>
          <p id="requests-made">Amount of requests you've made: {profile.requestsMade}</p>
          <p id="requests-received">Amount of requests to trade with you: {profile.requestsReceived}</p>
          </div>
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

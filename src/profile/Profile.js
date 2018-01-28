import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      isShowingModal: false
    }
  }

  showModal(){
    this.setState((prev)=>{
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
      <div className="Profile">
        {this.state.isShowingModal ? <EditPromt field={this.state.field}/> : ''}
        <h1>Your Profile</h1>
        <p>First name: {profile.firstName}<button onClick={this.showModal}>edit</button></p>
        <p>Last name: {profile.lastName}<button onClick={this.showModal}>edit</button></p>
        <p>city: {profile.city}<button onClick={this.showModal}>edit</button></p>
        <p>state: {profile.state}<button onClick={this.showModal}>edit</button></p>
        <p>user name: {profile.userName}<button onClick={this.showModal}>edit</button></p>
        <p>password: *****<button onClick={this.showModal}>edit</button></p>
        <br />
        <br />
        <p># of books traded: {profile.booksTraded}</p>
        <p># of requests you've made: {profile.requestsMade}</p>
        <p># of requests to trade with you: {profile.requestsReceived}</p>
      </div>
    );
  }
}

class EditPromt extends Component {
  render(){
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

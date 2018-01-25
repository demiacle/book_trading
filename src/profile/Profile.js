import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props){
    super(props)

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
    return (
      <div className="Profile">
        {this.state.isShowingModal ? <EditPromt field={this.state.field}/> : ''}
        <h1>Your Profile</h1>
        <p>First name: {this.props.firstName}<button onclick={this.showModal}>edit</button></p>
        <p>Last name: {this.props.lastName}<button onclick={this.showModal}>edit</button></p>
        <p>city: {this.props.city}<button onclick={this.showModal}>edit</button></p>
        <p>state: {this.props.state}<button onclick={this.showModal}>edit</button></p>
        <p>user name: {this.props.userName}<button onclick={this.showModal}>edit</button></p>
        <p>password: *****<button onclick={this.showModal}>edit</button></p>
        <br />
        <br />
        <p># of books traded: {this.props.booksTraded}</p>
        <p># of requests you've made: {this.props.requestsMade}</p>
        <p># of requests to trade with you: {this.props.requestsReceived}</p>
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

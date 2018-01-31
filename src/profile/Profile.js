import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  renderBooks() {
    var books = this.props.userBooks;
    books = books.map(i => {
      return (
        <div className="my-book" key={i.title + i.thumbnail}>
          <img src={i.thumbnail} alt={i.title} />
          <div>
            <form
              id="remove-form"
              action="/remove-book-from-list"
              method="POST"
            >
              <input type="hidden" name="id" value={i._id} />
              <button type="submit">X</button>
            </form>
            <form id="request-form" action="/respond-to-request" method="POST">
              <input type="hidden" name="id" value={i._id} />
              <button
                type="submit"
                name="requestType"
                value="accept"
                disabled={!i.requestedByUser}
              >
                accept request
              </button>
              <button
                type="submit"
                name="requestyType"
                value="deny"
                disabled={!i.requestedByUser}
              >
                deny request
              </button>
            </form>
          </div>
        </div>
      );
    });
    return <div className="my-books">{books}</div>;
  }
  render() {
    var profile = this.props.profile;
    return (
      <div>
        <h1>Your Profile</h1>
        <div id="profile-container">
          <form id="profile-form" method="POST" action="/update-profile">
            <label htmlFor="first-name">First name:</label>
            <input
              id="first-name"
              name="firstName"
              placeholder={profile.firstName}
            />

            <label htmlFor="last-name">Last name:</label>
            <input
              id="last-name"
              name="lastName"
              placeholder={profile.lastName}
            />

            <label htmlFor="city">city:</label>
            <input id="city" name="city" placeholder={profile.city} />

            <label htmlFor="state">state:</label>
            <input id="state" name="state" placeholder={profile.state} />

            <label htmlFor="user-name">user name:</label>
            <input
              id="user-name"
              name="userName"
              placeholder={profile.userName}
            />

            <label htmlFor="password">password:</label>
            <input id="password" name="password" placeholder="*****" />
            <div />
            <button id="save-button" type="submit" onClick={this.updateProfile}>
              Save
            </button>
          </form>
          <div id="profile-stats">
            <p id="books-traded">{profile.booksTraded} books donated</p>
          </div>
          <h2 id="my-books-title">My Books For Trade</h2>
          <form id="add-book-form" action="/google-books" method="GET">
            <input type="text" name="search" placeholder="Search..." required />
            <button type="submit">Add Book</button>
          </form>
          {this.renderBooks()}
        </div>
      </div>
    );
  }
}

export default Profile;

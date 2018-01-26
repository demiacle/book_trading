import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <a href="/">
              <div>Home</div >
            </a>
          </li>
          <li>
            <a href="/books-for-trade">
              <div>Books</div>
            </a>
          </li>
          { this.props.isLoggedIn ?
          <li>
            <a href="/profile">
              <div>Profile</div>
            </a>
          </li> 
          :''}
          { this.props.isLoggedIn &&
          <li>
            <a href="/profile">
              <div>Profile</div>
            </a>
          </li> 
          }
          { this.props.isLoggedIn &&
          <li>
            <a href="/logout">
              <div>Logout</div>
            </a>
          </li> 
          }
          <li className="right">
            <form action="/search">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">search</button>
            </form>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
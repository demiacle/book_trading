import React, { Component } from 'react';
import './Books.css';

class Books extends Component {
  render() {
    return (
      <div className="Books">
        <h1>Books&middot;Available&middot;For&middot;Trade</h1>
        <div id="paginationContainer">
        </div>
        <p>render all books in pagination</p>
      </div>
    );
  }
}

export default Books;

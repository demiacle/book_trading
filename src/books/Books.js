import React, { Component } from 'react';
import './Books.css';

// Required props 
// currentPage
// totalPages

class Books extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  // TODO refactor into component
  renderPagination() {
    var pagination = [];
    var lowerBound = Math.max(1, this.props.currentPage - 5);
    var higherBound = Math.min( this.props.totalPages, this.props.currentPage + 5);
    if (lowerBound > 1 ) {
      pagination.push(<a href={'/books?page=' + lowerBound} key="low">&lt;</a>)
    }

    for (var i = lowerBound; i <= higherBound; i++) {
      pagination.push(<a className={i === this.props.currentPage ? 'bold' : ''} href={'/books?page=' + i} key={'page' + i}>{i}</a>);
    }

    if (higherBound > this.props.currentPage && higherBound !== this.props.totalPages ) {
      pagination.push(<a href={'/books?page=' + (higherBound)} key="high">&gt;</a>)
    }

    return <div id="paginationContainer">{pagination}</div>
  }

  renderBooks() {
    var books = this.props.books;
    books = books.map(i => {
      return <div className='book' key={'book' + i.title}>{i.title}</div>
    })
    return <div id='book-grid'>{books}</div>
  }
  renderTradeStatus() {
    return <div>TRADE STATUS</div>
  }
  render() {
    return (
      <div className="Books">
        {this.props.isLoggedIn ? this.renderTradeStatus() : null}
        <h1>Books&middot;Available&middot;For&middot;Trade</h1>
        { this.props.query && <h1>Search for {this.props.query}</h1>}
        {this.props.isShowingPagination && this.renderPagination()}
        {this.props.books.length === 0 && <p className="no-books-found">No books found</p>}
        {this.renderBooks()}
        {this.props.isShowingPagination && this.renderPagination()}
      </div>
    );
  }
}

export default Books;

import React, { Component } from 'react';
import './Books.css';

class Books extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  renderPagination() {
    var pagination = [];
    var lowerBound = Math.max(1, this.props.currentPage - 5);
    var higherBound = Math.min(this.props.totalPages, this.props.currentPage + 5);
    if (lowerBound > 1) {
      pagination.push(<a href={'/books-for-trade?page=' + lowerBound} key="low">&lt;</a>)
    }

    for (var i = lowerBound; i <= higherBound; i++) {
      pagination.push(<a className={i === this.props.currentPage ? 'bold' : ''} href={'/books-for-trade?page=' + i} key={'page' + i}>{i}</a>);
    }

    if (higherBound > this.props.currentPage && higherBound !== this.props.totalPages) {
      pagination.push(<a href={'/books-for-trade?page=' + (higherBound)} key="high">&gt;</a>)
    }

    return <div id="paginationContainer">{pagination}</div>
  }
  renderBooks() {
    console.log(this.props.location)
    var books = this.props.books;
    books = books.map(i => {
      return <div className='book' key={i.title + i.thumbnail}>
        <h3>{i.title}</h3>
        <img src={i.thumbnail} alt={i.title} />
        {(this.props.location && this.props.location.search)
          ?
          <form action="/add-book-to-list" method="POST">
            <input type="hidden" name="title" value={i.title} />
            <input type="hidden" name="thumbnail" value={i.thumbnail} />
            <button type="submit">Add to your list</button>
          </form>
          :
          <form action="/request-trade" method="POST">
            <input type="hidden" name="id" value={i._id} />
            <button type="submit">Request trade</button>
          </form>
        }
      </div>
    })
    return <div id='book-grid'>{books}</div>
  }
  renderTradeStatus() {
    return <div id="trade-status">
      <p>TRADE STATUS</p>
    </div>
  }
  render() {
    return (
      <div className="Books">
        {this.props.isLoggedIn && this.renderTradeStatus()}
        <h1>Books&middot;Available&middot;For&middot;Trade</h1>
        {this.props.query && <h1>Search for {this.props.query}</h1>}
        {this.props.isShowingPagination && this.renderPagination()}
        {this.props.books.length === 0 && <p className="no-books-found">No books found</p>}
        {this.renderBooks()}
        {this.props.isShowingPagination && this.renderPagination()}
      </div>
    );
  }
}

export default Books;

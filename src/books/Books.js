import React, { Component } from "react";
import "./Books.css";

class Books extends Component {
  renderPagination() {
    var pagination = [];
    var lowerBound = Math.max(1, this.props.currentPage - 5);
    var higherBound = Math.min(
      this.props.totalPages,
      this.props.currentPage + 5
    );
    if (lowerBound > 1) {
      pagination.push(
        <a href={"/books-for-trade?page=" + lowerBound} key="low">
          &lt;
        </a>
      );
    }

    for (var i = lowerBound; i <= higherBound; i++) {
      pagination.push(
        <a
          className={i === this.props.currentPage ? "bold" : ""}
          href={"/books-for-trade?page=" + i}
          key={"page" + i}
        >
          {i}
        </a>
      );
    }

    if (
      higherBound > this.props.currentPage &&
      higherBound !== this.props.totalPages
    ) {
      pagination.push(
        <a href={"/books-for-trade?page=" + higherBound} key="high">
          &gt;
        </a>
      );
    }

    return <div id="paginationContainer">{pagination}</div>;
  }
  renderBooks() {
    var books = this.props.books;
    books = books.map(i => {
      return (
        <div className="book" key={i.title + i.thumbnail}>
          <h3>{i.title}</h3>
          <img src={i.thumbnail} alt={i.title} />
          {this.props.location && this.props.location.search ? (
            <form action="/add-book-to-list" method="POST">
              <input type="hidden" name="title" value={i.title} />
              <input type="hidden" name="thumbnail" value={i.thumbnail} />
              <button type="submit">Add to your list</button>
            </form>
          ) : (
            <form action="/request-book" method="POST">
              <input type="hidden" name="id" value={i._id} />
              <button type="submit">Request book</button>
            </form>
          )}
        </div>
      );
    });
    return <div id="book-grid">{books}</div>;
  }
  renderTradeStatus() {
    var requestedBooks = this.props.requestedBooks;
    requestedBooks = requestedBooks.map((i, index) => (
      <li key={i.title + index}>{i.title}</li>
    ));
    return (
      <div id="trade-status">
        <p>Books you've requested</p>
        <ul>{requestedBooks}</ul>
      </div>
    );
  }
  render() {
    return (
      <div className="Books">
        {this.props.location ? (
          <h1>Add&middot;Your&middot;Books</h1>
        ) : (
          <h1>Available&middot;Books</h1>
        )}
        {this.props.isLoggedIn &&
          !this.props.location &&
          this.renderTradeStatus()}
        {this.props.query && <h1>Search: {this.props.query}</h1>}
        {this.props.isShowingPagination && this.renderPagination()}
        {this.props.books.length === 0 && (
          <p className="no-books-found">No books found</p>
        )}
        {this.renderBooks()}
        {this.props.isShowingPagination && this.renderPagination()}
      </div>
    );
  }
}

export default Books;

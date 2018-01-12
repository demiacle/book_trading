import React, { Component } from 'react';
import './Books.css';

// Required props 
// currentPage
// totalPages

class Books extends Component {
  constructor(props){
    super(props);
    console.log( props )
  }

  // TODO refactor into component
  renderPagination(){
    var pagination = [];
    var lowerBound = Math.max( 1, this.props.currentPage - 5 );
    var higherBound = Math.min( this.props.totalPages, this.props.currentPage + 5 );

    if( lowerBound > 1 ) {
      pagination.push( <a href={ '/books?page=' + lowerBound - 5} key="low">&lt;</a> )
    }

    for( var i = lowerBound; i <= higherBound; i++ ){
      pagination.push( <a className={ i === this.props.currentPage ? 'bold' : '' } href={ '/books?page=' + i } key={i}>{i}</a> );
    }

    if( higherBound > this.props.currentPage ){
      pagination.push( <a href={ '/books?page=' + ( higherBound + 5 )} key="high">&gt;</a> )
    }

    return <div id="paginationContainer">{pagination}</div>
  }

  renderBooks(){
    var books = this.props.books;
    books = books.map(i=>{
      return <div className='book'>{i}</div>
    })


    return <div className='booksContainer'>{books}</div>

  }
  renderTradeStatus() {

    return <div>TRADE STATUS</div>
  }
  render() {
    return (
      <div className="Books">
        {this.props.isLoggedIn ? this.renderTradeStatus(): null}
        <h1>Books&middot;Available&middot;For&middot;Trade</h1>
        {this.renderPagination()}
        {this.renderBooks()}
        {this.renderPagination()}
      </div>
    );
  }
}

export default Books;

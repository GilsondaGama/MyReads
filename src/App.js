import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends Component {
  state = { books: [] }
   
    /*showSearchPage: false */
 
  componentDidMount() {
    BooksAPI.getAll()    
      .then((books) => {
        this.setState(() => ({
          books
        }))        
      })
  }

  changeShelf = (book, selectShelf) => {
    let { books } = this.state; 
    
    console.log('STATE - ANTES', books)    
    console.log('BOOK ID', book.book.id); 
    console.log('BOOK', book);

    books=books.filter(b => b.id !== book.book.id).concat({
      ...book.book,      
      shelf: selectShelf
    }); 
    
    console.log('STATE', books)         
    console.log('SELECTED SHELF', selectShelf);

    this.setState({ books });
  }  
  
  render() {
    const { books = [] } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">              
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div>
                  <ListBooks books={books} shelfs='currentlyReading' bookshelftitle='Currently Reading' 
                    changeShelf={this.changeShelf}
                  />        
                </div>
                <div>
                  <ListBooks books={books} shelfs='wantToRead' bookshelftitle='Want To Read'
                    changeShelf={this.changeShelf}                    
                  />        
                </div>
                <div>
                  <ListBooks books={books} shelfs='read' bookshelftitle='Read'        
                    changeShelf={this.changeShelf}                    
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>      

    )
  }
}

export default BooksApp




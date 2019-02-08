import React from 'react'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []        
    /*showSearchPage: false */
  }

  componentDidMount() {
    BooksAPI.getAll()    
      .then((books) => {
        this.setState(() => ({
          books
        }))        
      })
  }

  changeShelf(book, shelf) {
    console.log('BOOK ID', book);
    console.log('SELECTED SHELF', shelf);
  }

  render() {
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
                  <ListBooks books={this.state.books} shelfs='currentlyReading' bookshelftitle='Currently Reading' 
                    onChangeShelf={this.changeShelf}
                  />        
                </div>
                <div>
                  <ListBooks books={this.state.books} shelfs='wantToRead' bookshelftitle='Want To Read'
                    onChangeShelf={this.changeShelf}
                  />        
                </div>
                <div>
                  <ListBooks books={this.state.books} shelfs='read' bookshelftitle='Read'        
                    onChangeShelf={this.changeShelf}
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




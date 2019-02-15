import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = { books: [],
            query: '',
            updateQuery: '',
            showSearchPage: false }
 
  componentDidMount() {
    BooksAPI.getAll()    
      .then((books) => {
        this.setState(() => ({
          books
        }))        
      })
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query:query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  changeShelf = (book, selectShelf) => {
    let { books } = this.state; 
    books=books.filter(b => b.id !== book.book.id).concat({
      ...book.book,      
      shelf: selectShelf
    }); 
    this.setState({ books });
  }  
  
  render() {
    const { books = [] } = this.state;
    const { query } = this.state
    const { showSearchPage } = this.state.showSearchPage
    const { updateQuery } = this.state.updateQuery
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks books={books} changeShelf={this.changeShelf} query={query} 
                      showSearchPage={showSearchPage} updateQuery={updateQuery}
          />
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




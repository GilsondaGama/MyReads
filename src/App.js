import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = { books: [],
            showSearchPage: false }
 
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
    books=books.filter(b => b.id !== book.book.id).concat({
      ...book.book,      
      shelf: selectShelf
    }); 

    BooksAPI.update(book, selectShelf) 
      .then(() => {  })
      .catch(() => { alert('Something went wrong with your request.'); })
 
    this.setState({ books });

    console.log('BOOK', book)
    console.log('SELECSHELF', selectShelf)
  }  

  render() {
    const { books = [] } = this.state
    const { showSearchPage } = this.state.showSearchPage
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks books={books} changeShelf={this.changeShelf} 
                      showSearchPage={showSearchPage}
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




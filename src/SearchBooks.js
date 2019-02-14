import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import './App.css'
import RatingBook from './RatingBook'
import SelectShelf from './ListBooks'
import changeShelf from './App'

class SearchBooks extends Component {
  state = {
    query: '',
    showSearchPage: false
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query:query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    const { query } = this.state
    const { books } = this.props

    const showingBooks = query === ''
    ? books
    : books.filter((b) => (
      b.title.toLowerCase().includes(query.toLowerCase())
      ))                                    

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" 
            onClick={() => this.setState({ showSearchPage: false })}>Close</button>
          <div className="search-books-input-wrapper">              
            <input type="text" placeholder="Search by title or author"
              value = { query }
              onChange = {(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          {showingBooks.length !== books.length && (
            <div>
              <span>Now showing {showingBooks.length} of {books.length}. </span>
              <button onClick={this.clearQuery}>Show all</button>
            </div>
          )}

          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key = {book.id}>     
           
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, 
                      backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}>
                    </div>   

                    <div className="book-shelf-changer">
                      <select id={book.id} 
                          onChange={() => {changeShelf({book}, 
                                  SelectShelf(document.getElementById(book.id)))}}>

                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead" >Want to Read</option>
                        <option value="read" >Read</option>                                            
                        <option value="none" >None</option>
                      </select>
                    </div>
                    <div className="book-rating-star">
                      <div className="book-rating-number">
                        {RatingBook(book.title)}
                      </div>
                    </div>
                  </div>
                  <div className="book-title">{ book.title }</div>
                  <div className="book-authors">{ book.authors }</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )    
  }
}

export default SearchBooks



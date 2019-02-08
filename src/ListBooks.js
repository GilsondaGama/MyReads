import React, { Component } from 'react'
//import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'

import './App.css'

class ListBooks extends Component {
  /*
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }
  */
  render () {
    const { books, shelfs, bookshelftitle } = this.props   
    
    //console.log('BOOKS', books)
    //console.log('STATE', this.props);

    const showingBooks = books.filter((b) => b.shelf === shelfs)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelftitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          
            {showingBooks.map((book) => (
              <li key = {book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, 
                      backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}>
                    </div>   


                    <div className="book-shelf-changer">
                      <select id="book-shelf-changer" 
                        onClick={() => this.props.onChangeShelf(book.id,
                          () => {
                            let e = document.getElementById("book-shelf-changer");
                            let strShelf = e.options[e.selectedIndex].text;
                            return strShelf
                          }
                        )}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>                                            
                        <option value="none">None</option>
                      </select>
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
/*
ListBooks.PropTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}
*/
export default ListBooks



import React from 'react'
//import { Link } from 'react-router-dom'
import './App.css'

const ListBooks =({books, shelfs, bookshelftitle, changeShelf}) => {
  const showingBooks = books.filter((b) => b.shelf === shelfs)

  function SelectShelf(getElement) {   
    let strShelf = getElement.options[getElement.selectedIndex].value; 
    return strShelf
  }

  function RatingBook(bookTitle) {
    let letra = bookTitle.substring(0,1).toUpperCase()
    if    (['1','6','A','F','K','P','U','Z'].indexOf(letra) !== -1) {  return '1'
    } else if (['2','7','B','G','L','Q','V'].indexOf(letra) !== -1) {  return '2'
    } else if (['3','8','C','H','M','R','W'].indexOf(letra) !== -1) {  return '3'
    } else if (['4','9','D','I','N','S','X'].indexOf(letra) !== -1) {  return '4'            
    } else if (['5','0','E','J','O','T','Y'].indexOf(letra) !== -1) {  return '5'
    } else { return '0' }
  }

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

export default ListBooks



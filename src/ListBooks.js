import React from 'react'
//import { Link } from 'react-router-dom'
import './App.css'

const ListBooks =({books, shelfs, bookshelftitle, changeShelf}) => {
  const showingBooks = books.filter((b) => b.shelf === shelfs)

  function SelectShelf(getElement) {   
    let strShelf = getElement.options[getElement.selectedIndex].text;  
    console.log('STRShelf', strShelf)
    return strShelf
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
                    <select id="book-shelf-changer" 
                      onChange={() => {changeShelf({book}, 
                              SelectShelf(document.getElementById("book-shelf-changer")))}}>

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

export default ListBooks



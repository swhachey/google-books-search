import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List/list";
import DeleteBtn from "../components/DeleteBtn/index"
import ViewBtn from "../components/ViewBtn/viewbtn"

function Saved() {
const [books, setBooks] = useState([])

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  };

    return (
        <div>
          {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <img src={book.image} alt={book.title}/>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                      <p>{book.description}</p>
                    </Link>
                    <ViewBtn link={book.link}/>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        </div>
    )
}

export default Saved

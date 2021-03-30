import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List/list";
import { Input, FormBtn } from "../components/SearchForm/searchform";
import ViewBtn from "../components/ViewBtn/viewbtn"
import SaveBtn from "../components/SaveBtn/savebtn"

class Search extends Component {
  state = {
    books: [],
    search: ""
  };

  // searches the GoogleBooks API storing the data in books array
  searchBooks = query => {
    API.searchGoogle(query)
      .then(res =>
        this.setState(
          {
            books: res.data.items,
            search: ""
          },
        )
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // once the search term is submitted, search the GoogleBooks API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.title)
    this.searchBooks(this.state.title);
  };

  // deletes book from database
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => console.log(res.status))
      .catch(err => console.log(err));
  };

  // saves book to database
  handleSaveBook = bookData => {
    API.saveBook(bookData)
      .then(res => alert("Book Saved!"))
      .catch(err => console.log(err));
  };

  render() {
    return (
            <div>
            <div className="container">
            <form>
              <Input
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
           </div>
           <br/>
           <br/>
              <List>
                  {this.state.books.map(book => (
                  <ListItem
                    key={book.id}
                    src={book.volumeInfo.imageLinks 
                      ? book.volumeInfo.imageLinks.thumbnail
                      : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-icon.png"}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(", ")
                      : "N/A"}
                    date={book.volumeInfo.publishedDate}
                    description={book.volumeInfo.description}
                    link={book.volumeInfo.infoLink}
                    handleSaveBook={() => this.handleSaveBook({ 
                      title: book.volumeInfo.title,
                      src: book.volumeInfo.imageLinks 
                        ? book.volumeInfo.imageLinks.thumbnail 
                        : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/book-icon.png",
                      authors: book.volumeInfo.authors,
                      date: book.volumeInfo.publishedDate,
                      description: book.volumeInfo.description,
                      link: book.volumeInfo.infoLink})}
                  >
                      <h3>{book.volumeInfo.title} by {book.volumeInfo.authors}</h3>
                      <h5>{book.volumeInfo.publishedDate}</h5>
                      <p>{book.volumeInfo.description}</p>
                
                      <ViewBtn link={book.volumeInfo.infoLink}/>
                 
                      <br/>
                      <SaveBtn onClick={
                         (e)=>this.handleSaveBook(e)
                      }/>
                  </ListItem>
                ))}
              </List>
         </div>
    );
  }
}

export default Search;
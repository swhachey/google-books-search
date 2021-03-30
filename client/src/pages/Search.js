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

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.title)
    this.searchBooks(this.state.title);
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => console.log(res.status))
      .catch(err => console.log(err));
  };

  handleSaveBook = bookData => {
    console.log(bookData)
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
                Search Book
              </FormBtn>
            </form>
           </div>
           <br/>
           <br/>
              <List>
                  {this.state.books.map(book => (
                  <ListItem key={book.id}>
                     <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
                      <h3>{book.volumeInfo.title} by {book.volumeInfo.authors}</h3>
                      <h5>{book.volumeInfo.publishedDate}</h5>
                      <p>{book.volumeInfo.description}</p>
                
                
                      <ViewBtn link={book.volumeInfo.infoLink}/>
                 
                      <br/>
                      <SaveBtn onClick={
                         ()=>this.handleSaveBook({
                           title: book.volumeInfo.title,
                           author: book.volumeInfo.authors,
                           description: book.volumeInfo.description,
                           image: book.volumeInfo.imageLinks.thumbnail,
                           link: book.volumeInfo.infoLink
                         })
                      }/>
                  </ListItem>
                ))}
              </List>
         </div>
    );
  }
}

export default Search;
import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List/list";
import { Input, TextArea, FormBtn } from "../components/SearchForm/searchform";
import DeleteBtn from "../components/DeleteBtn/index"

function Search() {
 const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadSearch()
  }, [])

  function loadSearch() {
    API.searchBooks()
      .then(res => 
        setSearch(res.data)
      )
      .catch(err => console.log(err));
  };


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      API.searchBooks(formObject.title,
      )
         .then(res => {
                if (res.data.items === "error") {
                    throw new Error(res.data.items);
                }
                else {
                    // store response in a array
                    let results = res.data.items
                    //map through the array 
                    results = results.map(result => {
                        //store each book information in a new object 
                        result = {
                            key: result.id,
                            id: result.id,
                            title: result.volumeInfo.title,
                            author: result.volumeInfo.authors,
                            description: result.volumeInfo.description,
                            image: result.volumeInfo.imageLinks.thumbnail,
                            link: result.volumeInfo.infoLink
                        }
                        return result;
                    })
                    this.setSearch(results)
                }
            })
            .catch(err => this.setSearch(err));
    }
    }
  ;

    return (
            <div>
            <div className="container">
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              
              <FormBtn
                disabled={!( formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
           </div>
           <br/>
           <br/>
              <List>
               <ListItem>
                  
               </ListItem>
              </List>
         </div>
    )
}

export default Search

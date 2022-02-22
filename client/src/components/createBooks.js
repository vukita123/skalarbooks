import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { NavLink } from "react-router-dom";

 
export default class CreateBooks extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeBookName = this.onChangeBookName.bind(this);
    this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
    this.onChangeBookDescription = this.onChangeBookDescription.bind(this);
    this.onChangeBookPrice = this.onChangeBookPrice.bind(this);
    this.onChangeBookCover = this.onChangeBookCover.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      book_author: "",
      book_name: "",
      book_price: "",
      book_description: "",
      book_cover: "",
    };
  }

  // These methods will update the state properties.
  onChangeBookName(e) {
    this.setState({
      book_name: e.target.value,
    });
  }
 
  onChangeBookAuthor(e) {
    this.setState({
      book_author: e.target.value,
    });
  }
 
  onChangeBookDescription(e) {
    this.setState({
      book_description: e.target.value,
    });
  }

  onChangeBookPrice(e) {
    this.setState({
      book_price: e.target.value,
    });
  }

  onChangeBookCover(e){
      this.setState({
          book_cover: e.target.value,
      })
  }
 
// submit event

  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newbook = {
      book_name: this.state.book_name,
      book_author: this.state.book_author,
      book_description: this.state.book_description,
      book_price: this.state.book_price,
      book_cover: this.state.book_cover,
    };
 
    axios
      .post("http://localhost:5000/record/addbooks", newbook)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      person_name: "",
      book_author: "",
      book_description: "",
      book_price: "",
      book_cover: "",
    });
  } 
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <NavLink to="../recordList">
                        <div class="update_test">
                          Books
                        </div>
                        </NavLink>
        <h3>Create New Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Book Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.book_name}
              onChange={this.onChangeBookName}
            />
          </div>
          <div className="form-group">
            <label>Book Author: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.book_author}
              onChange={this.onChangeBookAuthor}
            />
          </div>
          <div className="form-group">
            <label>Book Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.book_description}
              onChange={this.onChangeBookDescription}
            />
          </div>
          <div className="form-group">
            <label>Book Price: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.book_price}
              onChange={this.onChangeBookPrice}
            />
          </div>
          <div className="form-group">
            <label>Book Cover: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.book_cover}
              onChange={this.onChangeBookCover}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add book"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
import React, { Component } from "react";
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import './books.css';

const Record = (props) => (
  <NavLink className="navbar-brand" to={`/singlebook/${props.record._id}`}>
  <div class="container">
    <div class="book_card" width="100%" align-content="center">
        <div class="book_img">  <img src={props.record.book_cover} alt="bookimg" />  </div>
        <div class="book_text" display="inline-block">
          <div class="book_name">{props.record.book_name}</div>
          <div class="book_author">{props.record.book_author}</div>
        </div>
        <div class = "book_price_flex">
          <div class="book_price">{props.record.book_price}.00 din</div>
        </div>
    </div>
  </div>
  </NavLink>
);

export default class Books extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
        console.log("failed here");
      });

      // console.log(JSON.parse(localStorage.getItem("cart")))
  }

  //testing localstorage


  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      console.log(currentrecord._id);
      return (
        <Col sm={4}>
          <Record
            record={currentrecord}
            deleteRecord={this.deleteRecord}
            key={currentrecord._id}
            name = {currentrecord.book_name}
          />
        </Col>
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <Container>
        <Row>
            {this.recordList()}
        </Row>
      </Container>
    );
  }
}
import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { NavLink } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.book_name}</td>
    <td>{props.record.book_author}</td>
    <td>{props.record.book_description}</td>
    <td>{props.record.book_price}</td>
    <td>{props.record.book_cover}</td>
    <td>
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("https://skalarbooks.herokuapp.com/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("https://skalarbooks.herokuapp.com/record" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
        <NavLink to="../createBooks">
                        <div class="update_test">
                          Add More
                        </div>
                        </NavLink>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Description</th>
              <th>Price</th>
              <th>Cover</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}
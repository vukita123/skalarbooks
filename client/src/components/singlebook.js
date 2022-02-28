import React, { Component } from "react";
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";


export default class Singlebook extends Component {


    constructor(props) {
      super(props);
      this.state = {
        book_name : "",
        book_author : "",
        book_cover : "",
        book_description : "",
        book_price : "",
        id : "",
        add : "",
        amount : "1"
        // records: []
      };
      this.componentDidMount = this.componentDidMount.bind(this);
      this.addtocart = this.addtocart.bind(this);
      this.onAmountChange = this.onAmountChange.bind(this);
      console.log(this.state.add);
      
     }
  
    componentDidMount(){
      //localStorage.clear()

      axios
        .get("https://skalarbooks.herokuapp.com/record/" + this.props.match.params.id)
        .then(async(response) => {
          this.setState({
            book_name: response.data.book_name,
            book_author: response.data.book_author,
            book_cover: response.data.book_cover,
            book_price: response.data.book_price,
            book_description: response.data.book_description,
            id : response.data._id
          });
          console.log("success");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    addtocart(name){
      console.log(name);
      this.setState({ add: name});
      this.addtocart = this.addtocart.bind(this);
      console.log(this.state.add);
      sessionStorage.setItem(name, JSON.stringify(this.state));

      //localStorage.clear();
      //console.log(JSON.parse(localStorage.getItem()))
    }


    //Amount

    // addAmount(x){
    //   localStorage.setItem(this.state.book_name, JSON.stringify(this.state));
    // }


    onAmountChange(event) {
      console.log(this.state.amount);
      this.setState({amount: event.target.value});
      console.log("event: "+ event.target.value);
      console.log(this.state.amount);
      console.log(localStorage)
    }

    setAmount(){
      sessionStorage.setItem(this.state.book_name,JSON.stringify(this.state.amount) );
      console.log(localStorage)
    }


    
    render() {
      return (
        <Container>
          <Row class="single_book_row">
            <Col class="single_book_img">
              <div class="bookimg">
                <img src={this.state.book_cover} alt="bookimg"/>
              </div>
            </Col>

            <Col class="single_book_data">

              <div class="single_book_name">{this.state.book_name}</div>
              <div class="single_book_author">{this.state.book_author}</div>

              {/* <div class="opis">Opis:</div>  */}
              <div class="bookdesc">
                {this.state.book_description}
              </div>

              <div class="single_book_price">{this.state.book_price}.00 din</div> 
              <div className="col-md-2">
                Količina:
                <input placeholder = "1"  id="name" type="text" 
                className="form-control" required value={this.state.amount} 
                onChange={this.onAmountChange}/>
              </div>    
              
              <NavLink to="../cart">
                <div class="btn">
                  <button class="button-23"onClick={() => this.addtocart(this.state.id) && this.setAmount}>Dodaj u korpu</button>
                </div>
              </NavLink>
            </Col>
          
          </Row>
        </Container>
      );
    }
}
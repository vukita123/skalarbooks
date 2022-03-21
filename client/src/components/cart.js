import React, { Component } from "react";
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
const nodemailer = require('nodemailer');

const Record = (props) => (
  // <NavLink className="navbar-brand" to={`/singlebook/${props.record._id}`}>
  <div class="cart_container">
        {/* <Col class="cart_book_img"> */}
          <div class="cart_img">  
            <img src={props.record.book_cover} alt="bookimg" />
          </div>
        {/* </Col> */}
          
        {/* <Col  class="cart_book_desc"> */}
          <div class="cart_book_text" display="inline-block">
            <div class="cart_book_name">{props.record.book_name}</div>
            {/* <div class="cart_book_author">{props.record.book_author}</div> */}
          </div>

          <div class="cart_book_price">{props.record.book_price}.00 din</div>
          <div class="bla">   ({props.record.amount}) </div>
          


        {/* </Col> */}
  </div>
  
);



export default class Cart extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      email: '',
      subject:'',
      grad: '',
      message: '',
      phone: '',
      zip: '',
      maybe: '',
      records: [],
      total: [],
      books: [],
      test: []
    };
  }

  // This method will get the data from the database.
  componentDidMount() {
    //localStorage.clear()
    console.log(sessionStorage)

    for (const key in sessionStorage) {
      if (!sessionStorage.hasOwnProperty(key)) {
        continue; // skip keys like "setItem", "getItem" etc
      }  
                  console.log(JSON.parse(sessionStorage.getItem(key)));
                  let something = (JSON.parse(sessionStorage.getItem(key)));
                  console.log(something["amount"]);
                  this.setState(prevState => ({ test: [...prevState.test, something["amount"]] }));
                  this.setState(prevState => ({ records: [...prevState.records, something] }));
                  this.setState(prevState => ({ total: [...prevState.total, something["book_price"]] }));
                  let order = something["book_name"] + " (" +something["amount"]+")";
                  this.setState(prevState => ({ books: [...prevState.books, order] }));
                  console.log("pass");
                  console.log(this.state.books);
    }

    console.log("This is a test: ");
    console.log(this.state.test);
  }

  //testing localstorage


  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
          <Record
            record={currentrecord}
            key={currentrecord._id}
            name = {currentrecord.book_name}
          />
          
      );
    });
  }

  totalList(){
    var numberArray = this.state.total.map(Number);
    var amountArray = this.state.test.map(Number);
    console.log(numberArray);
    console.log(amountArray);
    //var amountArray = this.state.amount.map(Number);
    var sum = 0;
    for (let i = 0; i < numberArray.length; i++) {
      sum += numberArray[i]*amountArray[i];
    }
    return (" "+ sum.toFixed(2)+ " din");
  }

  // Amount

  




  

  // removeFromCart() {
  //   localStorage.clear();
  // }



  // SUBMIT FORM


  onSubmit(e) {
    e.preventDefault();
    
    var email_body = "Ime poručioca:  " + this.state.name + "\nKnjige: "+ this.state.books +'\nAdresa:  '+ this.state.subject +'\nGrad:  '+ this.state.grad +'\nPostanski broj:  '+ this.state.zip +'\nTelefon:  '+ this.state.phone +'\nCena: ' + this.totalList();
    console.log(email_body);
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newbook = {
      name: this.state.name,
      email: this.state.email+",skalarns@gmail.com",
      // email: this.state.email+",lukavrbaski96@gmail.com",
      message: email_body
    };
 
    axios
      .post("https://skalarbooks.herokuapp.com/record/send", newbook)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      name: '',
      email: '',
      subject:'',
      grad: '',
      message: '',
      phone: '',
      zip: '',
    });
  } 

// resetForm(){
//     this.setState({name: '', email: '',subject:'', message: ''})
// }




    onNameChange(event) {
      this.setState({name: event.target.value})
  }

  onEmailChange(event) {
      this.setState({email: event.target.value})
  }

  onSubjectChange(event) {
      this.setState({subject: event.target.value})
  }

  onGradChange(event) {
    this.setState({grad: event.target.value})
}

  onZipChange(event) {
    this.setState({zip: event.target.value})
  }
  onPhoneChange(event) {
    this.setState({phone: event.target.value})
  }

  onAmountChange(event) {
    this.setState({amount: event.target.value})
  }







  // This following section will display the table with the records of individuals.
  render() {
    return (
      <Container>
        <Row>
        <Col>
        <Row>
            {this.recordList()}
        </Row>
        {/* <Row>
          {this.amountList()}
        </Row> */}
        <Row>
          <div class="books_total">
            Ukupno: 
            {this.totalList()}
            , plus cena dostave
          </div>
        </Row>
        </Col>
        {/* <NavLink className="navbar-brand" to={`./checkout`}>
          <div class="check_btn">
          <button class="button-23" onClick={this.removeFromCart}>Poruči</button>
          </div>
        </NavLink> */}

        <Col>
            <div className="section">
                            <div className="container">
                                <div className="row">
                                    <div className="">
                                        <div className="section-title">
                                            <h2 className="title">Lični podaci: </h2>
                                            <p>Molimo vas unesite neophodne podatke kako bi kupovina bila finalizovana!</p><hr/>
                                            <form id="contact-form" onSubmit={this.onSubmit.bind(this)} 
                                                method="POST">
                                            <div className="form-group">
                                            {/* <div className="row"> */}
                                            <div className="input_box">
                                                <input placeholder = "Ime i Prezime"  id="name" type="text" 
                                                  className="form-control" required value={this.state.name} 
                                                  onChange={this.onNameChange.bind(this)}/>
                                            </div>
                                            <div className="input_box">
                                                <input placeholder = "Email"  id="email" type="email"
                                                  className="form-control" aria-describedby="emailHelp"
                                                  required value={this.state.email} onChange=
                                                  {this.onEmailChange.bind(this)}/>
                                            </div>
                                            {/* </div> */}
                                            </div>
                                            <div className="input_box">
                                                <input placeholder = "Adresa"  id="subject" type="text"
                                                  className="form-control" required value={this.state.subject}
                                                  onChange={this.onSubjectChange.bind(this)}/>
                                            </div>
                                            <div className="input_box">
                                                <input placeholder = "Grad"  id="subject" type="text"
                                                  className="form-control" required value={this.state.grad}
                                                  onChange={this.onGradChange.bind(this)}/>
                                            </div>
                                            <div className="form-group">
                                            
                                            <div className="input_box">
                                                <input placeholder = "Poštanski broj"  id="zip" type="text" 
                                                  className="form-control" required value={this.state.zip} 
                                                  onChange={this.onZipChange.bind(this)}/>
                                            </div>
                                            <div className="input_box">
                                                <input placeholder = "Telefon"  id="phone" type="text"
                                                  className="form-control" 
                                                  required value={this.state.phone} onChange=
                                                  {this.onPhoneChange.bind(this)}/>
                                            </div>
                                            </div>
                                            
                                            <button class="button-23" type="submit" >Poruci</button>
                                            
                                            </form>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        </Col>
                        </Row>
                        <NavLink to="../recordList">
                        <div class="update_test">
                          
                        </div>
                        </NavLink>
                        

      </Container>
    );
  }
}
























// import React, { Component } from "react";
// import axios from 'axios';
// import { Container } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.css';




// export default class Cart extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           book_name : "",
//           book_author : "",
//           book_cover : "",
//           book_description : "",
//           book_price : "",
//           id : "",
//           add : "",
//           records: []
//         };
//         // this.componentDidMount = this.componentDidMount.bind(this);
        
//     }

  
//     componentDidMount(){
//         // console.log({...localStorage});
//         for (const key in localStorage) {
//             // //console.log(`${key}: ${localStorage.getItem(key)}`);
//             console.log(JSON.parse(localStorage.getItem(key)))
//             this.getterf(key);
//         }
//    }

//    getterf(id){
//     axios
//         .get("http://localhost:5000/record/" + id)
//         .then((response) => {
//           this.setState({
//             book_name: response.data.book_name,
//             book_author: response.data.book_author,
//             book_cover: response.data.book_cover,
//             book_price: response.data.book_price,
//             book_description: response.data.book_description,
//             id : response.data._id
//           });
//           console.log("success");
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//    }

//    removeFromCart(id) {
//        localStorage.removeItem(id);
//        this.componentDidMount();
//    }

    
//    render() {
//     return (
//       <Container>
//         <div width="100%" align-content="center">
//         <div>  <img src={this.state.book_cover} alt="bookimg" width="50%" />  </div>
//         <div class="bookitemtext" display="inline-block">
//             <div class="book_name">{this.state.book_name}</div>
//             <div class="book_author">{this.state.book_author}</div>
//         </div>
//         <div class="book_price">{this.state.book_price}</div>
//     </div><div> 
//             <button onClick={() => this.removeFromCart(this.state.id)}>ukloni</button>
//         </div>
//       </Container>
//     );
//   }
// }
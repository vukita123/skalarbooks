import React, { Component } from "react";
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";



// export default class NameForm extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//           name: '',
//           address: '',
//           email: ''
          
//         };
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     componentDidMount(){
        
//     }
  
//     handleChange(event) {
//       this.setState({
//           name: event.target.name,
//           address: event.target.address,
//           email: event.target.email

//         });
//     }
  
//     handleSubmit(event) {
//       alert('A name was submitted: ' + this.state.name);
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Ime i Prezime:
//             <input type="text" name={this.state.name} onChange={this.handleChange} />
//           </label>
//           <label>
//             Adresa:
//             <input type="text" address={this.state.address} onChange={this.handleChange} />
//           </label>
//           <label>
//             Email:
//             <input type="text" email={this.state.email} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Poruci" />
//         </form>
//       );
//     }
//   }



export default class Contact extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        subject:'',
        book_name:'',
        book_price:'',
        records: [],
        x : []
      }
  }

  componentDidMount() {

    for (const key in localStorage) {
                  // console.log(`${key}: ${localStorage.getItem(key)}`);

                  //console.log(JSON.parse(localStorage.getItem(key)));
                  this.setState(this.state.records = JSON.parse(localStorage.getItem(key)));
                  console.log(this.state.records);
                  //this.state.x = (Object.values(this.state.records));
                  //console.log(this.state.x[4]);
                   //this.state.x = JSON.parse(this.state.records.book_price);
                  // console.log(this.state.x);
                  //this.state.x = JSON.stringify(this.state.records);
                  //console.log(this.state.x);

                  //this.getterf(key);


                  // axios
                  // .get("http://localhost:5000/record/" +key)
                  // .then((response) => {
                  //   this.setState(prevState => ({ records: [...prevState.records, response.data.book_price] }));
                  // })
                  // .catch(function (error) {
                  //   console.log(error);
                  //   console.log("failed here");
                  // });
    }

  }


  submitEmail(e){
    e.preventDefault();
    axios({
      method: "POST", 
      url:"http://localhost:5000/record/send", 
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success'){
          alert("Message Sent."); 
          this.resetForm()
      }else if(response.data.status === 'fail'){
          alert("Message failed to send.")
      }
    })
  }

  resetForm(){
      this.setState({name: '', email: '',subject:''})
  }





    onNameChange(event) {
      this.setState({name: event.target.value})
  }

  onEmailChange(event) {
      this.setState({email: event.target.value})
  }

  onSubjectChange(event) {
      this.setState({subject: event.target.value})
  }



  render() {
    return (
        <div className="section">
            <div className="container" margin-bottom="100px">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h2 className="title">Porudzbina</h2>
                            <p>Porudzbina se placa pouzecem - cena dostave se placa dodatno prilikom preuzimanja</p><hr/>
                            <form id="contact-form" onSubmit={this.submitEmail.bind(this)} 
                                method="POST">
                            <div className="form-group">
                            <div className="row">
                            <div className="col-md-6">
                                <input placeholder = "Ime i Prezime"  id="name" type="text" 
                                  className="form-control" required value={this.state.name} 
                                  onChange={this.onNameChange.bind(this)}/>
                            </div>
                            <div className="col-md-6">
                                <input placeholder = "Email"  id="email" type="email"
                                  className="form-control" aria-describedby="emailHelp"
                                  required value={this.state.email} onChange=
                                  {this.onEmailChange.bind(this)}/>
                            </div>
                            </div>
                            </div>
                            <div className="form-group">
                                <input placeholder = "Adresa"  id="subject" type="text"
                                  className="form-control" required value={this.state.subject}
                                  onChange={this.onSubjectChange.bind(this)}/>
                            </div>
                            {/* <div className="form-group">
                                <textarea placeholder = "Message"  id="message" 
                                  className="form-control" rows="1" 
                                  required value={this.state.message}
                                  onChange= {this.onMsgChange.bind(this)}/>
                            </div> */}
                            <div class="order_btn">
                            <button type="submit" class="button-23" >Zavrsi</button>
                            {/* className="primary-btn submit" */}
                            </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
  }

}

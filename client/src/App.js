import React, {Component}from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Books from "./components/books";
import Singlebook from "./components/singlebook";
import Cart from "./components/cart";
import NameForm from "./components/checkout";
import Footer from "./components/footer";
import RecordList from "./components/recordList";
import CreateBooks from "./components/createBooks";

export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cart: {}
    }
  }

  render(){
    return (
      <div>
        <Navbar sticky="top" />
        <Route exact path="/">
            <Books />
        </Route>
        <Route path="/singlebook/:id" component={Singlebook}/> 
        <Route path="/cart" component={Cart}/>
        <Route path="singlebook/cart" component={Cart}/>   
        <Route path="/checkout" component={NameForm}/>
        <Route path="/testemail"/>
        <Route path="/createBooks">
          <CreateBooks />
        </Route>
        <Route exact path="/recordList">
          <RecordList />
        </Route>
        <Footer sticky="bottom" />
      </div>
    );
  };
}
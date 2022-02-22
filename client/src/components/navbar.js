import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { Col, Container, Row, } from "react-bootstrap";



const Navbar = () => {
  return (

   
    
    <ul>
      <li class="li_skalar">
      <NavLink  to="/">
           <img width='100%' height="100%" src="https://i.imgur.com/nBsZJyM.png" title="source: imgur.com" />
       </NavLink>
      </li>
      <li class="cart">
        <NavLink  to="../cart">
           <img width='100%' height="100%" src="https://i.imgur.com/OENTOFn.png" title="source: imgur.com" /> 
        </NavLink>
      </li>
    </ul>
  
  )};
// const Navbar = () => {
//   return (
//     <div class="navbar">
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <NavLink className="navbar-brand" to="/">
//           <div> <img width='30%' height="30%" src="https://i.imgur.com/nBsZJyM.png" title="source: imgur.com" /></div>
//         </NavLink>
        
 
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="../cart">
//                 <div> <img width='10%' height="10%" src="https://i.imgur.com/OENTOFn.png" title="source: imgur.com" /> </div>
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };
 
export default Navbar;
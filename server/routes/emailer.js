// const express = require('express');
// const app = express();
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require("dotenv").config({ path: "./config.env" });


// const recordRoutes = express.Router();

// const transporter = nodemailer.createTransport({
//     host: "gmail", //replace with your email provider
//     port: 587,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD
//     }
//   });


//   // verify connection configuration
// transporter.verify(function(error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });

 

//   app.post('/send', (req, res, next) => {
//     var name = req.body.name
//     var email = req.body.email
//     var subject = req.body.subject
//     var message = req.body.message
  
//     var mail = {
//       from: name,
//       to: email,
//       subject: subject,
//       text: message
//     }
  
//     transporter.sendMail(mail, (err, data) => {
//       if (err) {
//         res.json({
//           status: 'fail'
//         })
//       } else {
//         res.json({
//          status: 'success'
//         })
//       }
//     })
//   })
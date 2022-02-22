const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
//app.use(require("./routes/emailer"));
// get driver connection
const dbo = require("./db/conn");

app.use(function (req, res, next) {
    res.status(404).send("Sorry, can't find that!")
})

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//     user: 'skalarbooksorder@gmail.com',
//     pass: 'Knjizara1!'
//   }
// });


// // verify connection configuration
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//     console.log("stopped here");
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });


// app.post('/send', (req, res, next) => {
//   var name = req.body.name
//   var email = req.body.email
//   var subject = req.body.subject
//   var message = req.body.message

//   var mail = {
//     from: name,
//     to: email,
//     subject: subject,
//     text: message
//   }

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         status: 'fail'
//       })
//     } else {
//       res.json({
//        status: 'success'
//       })
//     }
//   })
// })
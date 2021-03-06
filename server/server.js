const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
require("dotenv").config({ path: "server/config.env" });
const port = process.env.PORT || 80;
console.log(port);
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
//app.use(require("./routes/emailer"));
// get driver connection
const dbo = require("./db/conn");


app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Step 2:
console.log(__dirname);
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry, can't find that!")
})
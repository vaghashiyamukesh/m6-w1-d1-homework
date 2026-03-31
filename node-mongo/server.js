const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require('./app/models/inventory.model.js');
const mongoose = require('mongoose');


const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const db = require("./app/models");

mongoose
  .connection
  .on("open", () => {
    console.log("Connected to the MongoDB database!");
  })
  .on("error", (err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to React CRUD Application." });
});

require("./app/routes/inventory.router.js")(app);

// set port, listen for requests
const server = app.listen(8080, function () {
    const port = server.address().port;
    const host = server.address().address;
    console.log("Server is running on http://%s:%s", host, port);
})

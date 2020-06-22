const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectID;

const dbConnection = require('./dbConnection');

const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(cors());

// -------------------ROUTES--------------------- //

app.use(require("./routes/auth"));
app.use(require("./routes/home"));


// -------------------Listen--------------------- //

let server = app.listen(port, function(){
  
  let host = server.address().address;
  let port = server.address().port;

  console.log("InternGram on " + host + " on port " + port);
})

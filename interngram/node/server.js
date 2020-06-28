const express = require('express');
const app = express();
const cors = require('cors');
var multer = require('multer');
var fs = require('fs');
const ObjectId = require('mongodb').ObjectID;

const dbConnection = require('./dbConnection');

const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(cors());

const DIR = '../src/assets/avatars';

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ".jpg")
  }
})
 
var upload = multer({ storage: storage })


app.post('/uploadAvatar', upload.any('avatar'), function (req, res, next) {
  
  const file = req.files[0]
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  console.log(file);
})

// -------------------ROUTES--------------------- //

app.use(require("./routes/auth"));
app.use(require("./routes/home"));


// -------------------Listen--------------------- //

let server = app.listen(port, function(){
  
  let host = server.address().address;
  let port = server.address().port;

  console.log("InternGram on " + host + " on port " + port);
})

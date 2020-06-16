// Url of the database

const mongoose = require('mongoose');

let baseUrl = "mongodb://localhost:27017/internGram";

const connectParams = { dbName: "internGram", useNewUrlParser: true };

// Connect to mongoose
mongoose.connect(baseUrl, connectParams);
let db = mongoose.connection;
db.on('error', (err) => {
  console.error.bind(console, 'connection error:');
  throw err;
});

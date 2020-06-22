
//Require Mongoose
const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
  type: String,
  title: String,
  meta: {
    url: String,
    alt: String
  },
  date: String
},
  { collection: "posts"}
);

const Post = mongoose.model('Post', PostSchema);


module.exports = Post;

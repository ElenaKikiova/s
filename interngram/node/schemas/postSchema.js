
//Require Mongoose
const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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

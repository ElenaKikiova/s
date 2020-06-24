
//Require Mongoose
const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comment: String
},
  { collection: "comments"}
);

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;

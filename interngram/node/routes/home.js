// SET ROUTER AND GENERAL FUNCTIONS
let express = require('express');
let router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const User = require('../schemas/userSchema');
const Post = require('../schemas/postSchema');
const Comment = require('../schemas/commentSchema');


router.get("/posts/:index", async (req, res) => {

  let index = req.params.index;
  let posts = await Post.find({})
    .skip(index * 10)
    .limit(10)
    .populate("userId", "-Password")
    .sort("-_id");

  if(posts.err) throw posts.err;
  else {
    res.send({posts: posts})
  }
  
});


router.get("/comments/:postId", async (req, res) => {

  let postId = req.params.postId;
  let comments = await Comment
    .find({ postId: ObjectId(postId)})
    .populate("userId", "-Password")
    .sort("-_id");

  if(comments.err) throw comments.err;
  else {
    res.send({comments: comments})
  }
  
});


router.post("/addComment", async (req, res) => {

  let comment = req.body.data;
  let addComment = new Comment(comment);

  addComment.save();

  if(addComment.err) throw addComment.err;
  else {
    res.send();
  }

});

router.post("/deleteComment", async (req, res) => {
  let commentId = req.body.commentId;

  let deleteComment = await Comment.findByIdAndDelete({ _id: ObjectId(commentId)} );
  if(deleteComment.err) throw deleteComment.err;
  else {
    res.send();
  }

})
  
router.post("/savePost", async (req, res) => {

  let post = req.body.data;
  let upsertPost = await Post.updateOne(
    { _id: ObjectId(post._id) }, 
    {
    $set: {
      userId: ObjectId(post.userId),
      type: post.type,
      title: post.title,
      meta: post.meta,
      date: post.date
    }
  }, { upsert: true });

  if(upsertPost.err) throw upsertPost.err;
  else {
    if(upsertPost.upserted != undefined){
      post._id = upsertPost.upserted[0]._id;
    }
    res.send({ post });
  }

});


router.post("/deletePost", async (req, res) => {

  let id = req.body.id;
  let deletePost = await Post.deleteOne({ _id: ObjectId(id) });
  if(deletePost.err) throw deletePost.err;
  else res.send();

});

router.post("/updateLikes", async (req, res) => {

  let post = req.body.post;
  console.log(post);
  let updateLikes = await Post.updateOne(
    { _id: ObjectId(post._id) }, 
    {
    $set: {
      likes: post.likes
    }
  });

  if(updateLikes.err) throw updateLikes.err;
  else {
    res.send();
  }

})

router.get("/bookmarks/:userId/:loadDetails", async (req, res) => {
  let userId = req.params.userId;
  let loadDetails = req.params.loadDetails;

  let bookmarks;

  if(loadDetails == "true"){
    bookmarks = await User
    .findOne({ _id: ObjectId(userId)})
    .select("-Email -Password -_id")
    .populate("Bookmarks")
  }
  else{
    bookmarks = await User
    .findOne({ _id: ObjectId(userId)})
    .select("-Email -Password -_id")
  }

  if(bookmarks.err) throw bookmarks.err;
  else {
    res.send({bookmarks: bookmarks.Bookmarks})
  }
})

router.post("/updateBookmarks", async (req, res) => {

  let user = req.body.user;
  console.log(user);
  let updateBookmarks = await User.updateOne(
    { _id: ObjectId(user._id) }, 
    {
    $set: {
      Bookmarks: user.Bookmarks
    }
  });

  if(updateBookmarks.err) throw updateBookmarks.err;
  else {
    res.send();
  }

})

module.exports = router;
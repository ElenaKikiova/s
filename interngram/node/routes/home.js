// SET ROUTER AND GENERAL FUNCTIONS
let express = require('express');
let router = express.Router();
const ObjectId = require('mongodb').ObjectID;


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
  console.log(comment);
  let addComment = new Comment(comment);

  addComment.save();

  res.send();

});

router.post("/deleteComment", async (req, res) => {
  // let comment = req.body.data;
  // console.log(comment);
  // let addComment = new Comment(comment);

  // addComment.save();

  res.send();
})
  
router.post("/savePost", async (req, res) => {

  let post = req.body.data;
  console.log(post);
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

module.exports = router;
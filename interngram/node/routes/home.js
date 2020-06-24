// SET ROUTER AND GENERAL FUNCTIONS
let express = require('express');
let router = express.Router();
const ObjectId = require('mongodb').ObjectID;


const Post = require('../schemas/postSchema');


router.get("/allPosts/:index", async (req, res) => {

  let index = req.params.index;
  let posts = await Post.find({})
    .skip(index * 10)
    .limit(10)
    .populate("userId")
    .sort("-_id");
  res.send({posts: posts})
  
});
  
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
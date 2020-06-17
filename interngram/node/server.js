const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;


const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(cors());


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

const dbConnection = require('./dbConnection');

app.get("/allPosts/:index", async (req, res) => {

  let index = req.params.index;
  let posts = await Post.find({}).skip(index * 10).limit(10).sort("-_id");
  console.log(posts);
  res.send({posts: posts})

});

app.post("/savePost", async (req, res) => {

  let post = req.body.data;
  console.log(post);
  let upsertPost = await Post.updateOne(
    { _id: ObjectId(post._id) }, 
    {
      $set: {
        type: post.type,
        title: post.title,
        meta: post.meta,
        date: post.date
      }
    }, { upsert: true });
  if(upsertPost.err) throw upsertPost.err;
  else res.send({ post: post });

});


app.post("/deletePost", async (req, res) => {

  let id = req.body.id;
  let deletePost = await Post.deleteOne({ _id: ObjectId(id) });
  if(deletePost.err) throw deletePost.err;
  else res.send();

});



let server = app.listen(port, function(){
  
  let host = server.address().address;
  let port = server.address().port;

  console.log("InternGram on " + host + " on port " + port);
})

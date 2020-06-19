const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const ObjectId = require('mongodb').ObjectID;

const dbConnection = require('./dbConnection');

const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(cors());

//Define a schema
const UserSchema = mongoose.Schema({
    Username: String,
    Password: String,
    Email: String
},
{ collection: "users" }
);

// Hash password before user is saved to database
UserSchema.pre('save', function (next) {
  let user = this;

  bcrypt.hash(user.Password, saltRounds, function (err, hash){
    if (err) {
      return next(err);
    }
    user.Password = hash;
    next();
  })
  next();
});

const User = mongoose.model('User', UserSchema);

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


// ---------------------------------------------- //
// -------------------ROUTES--------------------- //


app.post('/register', async(req, res) => {
  let user = req.body.data;

  console.log(user);

  let newUser = new User({
    Username: user.username,
    Email: user.email,
    Password: user.password
  })
  newUser.save();

  res.send()
})


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

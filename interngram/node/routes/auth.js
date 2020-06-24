// SET ROUTER AND GENERAL FUNCTIONS
let express = require('express');
let router = express.Router();
const ObjectId = require('mongodb').ObjectID;

// Require bcrypt for hashing passwords
const bcrypt = require('bcryptjs');

const User = require('../schemas/userSchema');


router.post('/checkEmail', async (req, res) => {
  let email = req.body.email;

  let findEmail = await User.findOne({ Email: email });
  let result = 0;

  if(findEmail != null){
    result = 1;
  }
  
  res.send({ matchingEmails: result });
})


router.post('/register', async(req, res) => {
  let email = req.body.data.email;
  let password = req.body.data.password;

  console.log(email, password);

  let newUser = new User({
    Email: email,
    Password: password
  })

  newUser.save();

    console.log(newUser);

  res.send()
})


router.post("/login", async (req, res) => {
  let userData = req.body.userData;
  let user = await User.findOne({ Email: userData.email });
  console.log(userData, "userd")
  console.log(user);
  

  if(user == null){
    res.send({ error: true });
  }
  else{
    console.log(userData.password, user.Password);

    bcrypt.compare(userData.password, user.Password, function (err, result) {
      if (result === true) {

        res.send({ userData: { 
          _id: user._id,
          Email: user.Email
        } });
    
      }
      else{
        res.send({ error: true });
      }
    });
  }

})

module.exports = router;
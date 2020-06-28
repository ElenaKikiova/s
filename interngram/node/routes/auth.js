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

// router.post("/uploadAvatar", async (req, res) => {

//   console.log(req.body);

//   const form = new formidable.IncomingForm(); 
//   form.parse(req, function(err, fields, files){ 

//     console.log(files);

//       // var oldPath = files.profilePic.path; 
//       // var newPath = path.join(__dirname, 'uploads') 
//       //         + '/' + files.profilePic.name 
//       // var rawData = fs.readFileSync(oldPath) 
    
//       // fs.writeFile(newPath, rawData, function(err){ 
//       //     if(err) console.log(err) 
//       //     return res.send("Successfully uploaded") 
//       // }) 

//       res.send();
//   }) 

// })

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname)
//   }
// });

// let upload = multer({
//   storage: storage
// });



// const DIR = '../src/assets/avatars';
// var upload = multer({dest: DIR});

// router.post("/uploadAvatar", upload.single('image'), function (req, res) {
//   // if (!req.file) {
//   //   console.log("No file is available!");
//   //   return res.send({
//   //     success: false
//   //   });

//   // } else {
//   //   console.log('File is available!');
//   //   return res.send({
//   //     success: true
//   //   })
//   // }

//   upload(req, res, function (err) {
//     if (err) {
//       return res.end(err.toString());
//     }
 
//     res.end('File is uploaded');
//   });
// });

module.exports = router;
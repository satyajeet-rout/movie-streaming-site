// const router = require("express").Router();
// // const { model } = require("mongoose");
// const User = require("../models/User")


// // REGISTER
// router.post('/register', async(req, res) => {
//     const newUser = new User({
//         username:req.body.username,
//         username:req.body.email,
//         username:req.body.password,
//     })

//     try {
//         const user = await newUser.save();
//     res.status(201).json(user)
//     } catch(err) {
//         res.status(500).json(err)
//     }
// })

// module.exports = router



const express = require('express');
const router = express.Router();
const User = require('../models/User');// Your Mongoose model
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const verify = require('../verifyToken')



//Register
router.post('/register', async (req, res) => {
  try {
      const user = new User(req.body);
    //   console.log(user.password);
      
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});


//Login
router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }) 
        !user && res.status(401).json("Wrong Password or email")

        const loginpassword = req.body.password
        const passwordCompare = bcrypt.compareSync(loginpassword, user.password);
        
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            {expiresIn:"5d"}
        )
        const {password, ...info}=user._doc
        if (!passwordCompare) {
            res.status(500).json('password is incorrect')
        } else {
            res.status(201).json({...info,accessToken})
        }

        
        
    } catch(err) {
        console.log(err);
        
    }
})









// // Get user
// router.get("/find/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...info } = user._doc;
//     res.status(200).json(info);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// //GET ALL
// router.get("/", verify, async (req, res) => {
//   const query = req.query.new;
//   if (req.user.isAdmin) {
//     try {
//       const users = query
//         ? await User.find().sort({ _id: -1 }).limit(5)
//         : await User.find();
//       res.status(200).json(users);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You are not allowed to see all users!");
//   }
// });

module.exports = router;

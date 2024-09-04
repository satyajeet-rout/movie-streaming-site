
const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const verify = require('../verifyToken')

//UPDATE
router.put('/:id', verify, async (req, res) => {
    // Ensure that req.user is defined and has the expected properties
    console.log(req.user); // Log entire user object for debugging

    // Check if the current user is allowed to update the user
    if (req.user.id === req.params.id || req.user.isAdmin) {
        // Hash the password if provided
        if (req.body.password) {
            try {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            } catch (error) {
                return res.status(500).json({ message: 'Error hashing password', error });
            }
        }

        // Update the user
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            
            // Check if the user was found and updated
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            console.log('Error updating user:', error);
            res.status(500).json({ message: 'Error updating user', error });
        }
    } else {
        res.status(403).json("You can update only your account");
    }
});




// DELETE USER
router.delete('/:id', verify, async (req, res) => {

    
    // Check if the current user is allowed to delete the user
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            // Find and delete the user by ID
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            
            // Check if the user was found and deleted
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send success response
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.log('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user', error });
        }
    } else {
        // Unauthorized access response
        res.status(403).json("You can only delete your own account");
    }
});

// Get user
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

// GET USER STATS
router.get('/stats', async (req, res) => {
    const today = new Date()
    const lastYear = today.setFullYear(today.setFullYear() - 1)
    
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router
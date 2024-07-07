const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Replace with the path to your Post model

router.post("/editProfile", async (req, res) => {
    if (!IsSignedIn) {
        console.log("User Not Logged in")
        return res.status(401).redirect('/login'); // Redirect to login if not signed in
    }

    try {
        const { username, password , AboutAuthor} = req.body;

        // Find the user and update their profile
        const updatedUser = await Register.findOneAndUpdate(
            { username: global.currentUser_Id },
            { username, email },
            { new: true, runValidators: true } // Return the updated document and validate before saving
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        // Update global variables
        global.currentUser_Id = updatedUser.username;

        // Fetch updated posts to display
        const data = await Post.find();
        alert("Database Updated ");
        res.status(200).render("index", { data });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            console.error(errors);
            res.status(400).send(errors); // Send validation errors as response
        } else {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
});

module.exports = router;
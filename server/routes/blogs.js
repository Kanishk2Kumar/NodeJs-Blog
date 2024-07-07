const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Replace with the path to your Post model

router.get('/blogs', async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from MongoDB

        res.render('blogs', { posts: posts });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
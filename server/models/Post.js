const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: [String], required: true },  // Array of strings for categories
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BlogPost = mongoose.model('Post', blogPostSchema);

module.exports = BlogPost;

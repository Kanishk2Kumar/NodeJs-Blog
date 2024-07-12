const express = require("express");
const router = express.Router();
const multer = require('multer');
const Post = require("../models/Post");
const BlogPost = require("../models/Post"); // Ensure you have imported the correct model
const { postImage } = require("../models/controller");
const Register = require("../models/register");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
         return cb(null, `${Date.now()}-${file.filename}`);
    }
});

const upload = multer({ storage: storage });

// Middleware to set default values for logged-in state and username
router.use((req, res, next) => {
    res.locals.isSignedIn = global.IsSignedIn || false;
    res.locals.currentUser = global.currentUser_Id || null;
    next();
});

// Routes
global.IsSignedIn = false;
global.currentUser_Id = null;
/**
 * GET /
 * HOME
 */
router.get("/", async (req, res) => {
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog Page created using Node JS, Express & MongoDB"
        };
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render("index", {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: "/"
        });
    } catch (error) {
        console.log(error);
    }
});
/**
 * GET /search
 * Search for blog posts based on query parameters
 */
router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.q.toLowerCase().trim();
        const posts = await Post.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } },
                { categories: { $regex: searchQuery, $options: 'i' } }
            ]
        }).exec();

        res.render('blogs', { data: posts });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while searching for posts.");
    }
});

// Other routes
router.post("/", upload.single("image"), postImage);

router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJs, Express & MongoDb.",
        };

        res.render('post', {
            locals,
            data,
            currentRoute: `/post/${slug}`
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/AddBlog", (req, res) => {
    res.render("AddBlog");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/blogs", async (req, res) => {
    try {
        const data = await Post.find();
        res.render('blogs', { data });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching the data.");
    }
});

router.get("/individualBlog", (req, res) => {
    res.render("individualBlog");
});

// Route for handling user registration form submission
router.post("/register", async (req, res) => {
    try {
        const register = new Register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const data = await Post.find();

        const registeredUser = await register.save();
        global.IsSignedIn = true;
        global.currentUser_Id = register.username;
        res.status(201).render("index", { data });
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

// Route for handling user login
router.post("/login", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await Register.findOne({ username });

        const data = await Post.find();

        if (!user) {
            return res.status(400).send("User not found. Register if you are new!");
        }

        if (user.password !== password) {
            return res.status(400).send("Invalid password. Please try again.");
        }
        if (user.email !== email) {
            return res.status(400).send("User not found. Register if you are new!");
        }
        global.IsSignedIn = true;
        global.currentUser_Id = username;
        res.status(200).render("index", { data });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// AddBlog post route
router.post("/AddBlog", upload.single('image'), async (req, res) => {
    try {
        // Parse categories from the request
        const categories = req.body.categories.split(',').map(category => category.trim());

        const newBlogPost = new BlogPost({
            title: req.body.title,
            content: req.body.content,
            image: req.file.path, // Save the path of the uploaded file
            categories: categories  // Assign parsed categories to the blog post
        });

        const savedBlogPost = await newBlogPost.save();
        console.log("Saved Blog Post:", savedBlogPost); // Check if categories are saved
        res.status(201).redirect('/'); // Redirect to the homepage or wherever you want
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

// Route to handle profile update
router.get("/editProfile", (req, res) => {
    res.render("editProfile");
})
router.post("/editProfile", async (req, res) => {
    if (!global.IsSignedIn) {
        console.log("User Not Logged in")
        return res.status(401).redirect('/login'); // Redirect to login if not signed in
    }

    try {
        const { username, email, password } = req.body;

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

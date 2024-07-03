const express = require("express");
const path = require("path");
const app = express();

// Importing database connection and Register model
require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 5000;

// Paths for static files and templates
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Serving static files
app.use(express.static(static_path));

// View engine setup
app.set("view engine", "ejs");
app.set("views", templates_path);

// Example data (replace with actual data fetching from database)
const posts = [
    { _id: 1, filename: 'thumbnail1', title: 'Post 1', description: 'Description for Post 1' },
    { _id: 2, filename: 'thumbnail2', title: 'Post 2', description: 'Description for Post 2' },
    // Add more posts as needed
];

// Route for rendering the index page with posts data
app.get("/", (req, res) => {
    res.render("index", { data: posts });
});


// Route for rendering the registration form
app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Route for handling user registration form submission
app.post("/register", async (req, res) => {
    try {
        const register = new Register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const registeredUser = await register.save();
        res.status(201).render("index");
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



// login check
// Route for handling user login
app.post("/login", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await Register.findOne({ username });

        if (!user) {
            return res.status(400).send("User not found. Register if you are new!");
        }

        if (user.password !== password) {
            return res.status(400).send("Invalid password. Please try again.");
        }

        res.status(200).render("index");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});

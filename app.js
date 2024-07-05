require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./server/config/db');
const blogRouter = require('./server/routes/blogs');
const mainRouter = require('./server/routes/main');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
const static_path = path.join(__dirname, 'public');
app.use(express.static(static_path));

// Templating Engine (EJS)
app.use(expressLayouts);
app.set('view engine', 'ejs');
const templates_path = path.join(__dirname, 'views');
app.set('views', templates_path);
app.set('layout', './layouts/main'); // Adjust if your layout file is located differently

// Routes
app.use('/', mainRouter);
app.use('/blogs', blogRouter); 
app.use('/uploads', express.static('uploads'));


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
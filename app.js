require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const blogRouter = require('./server/models/Post'); 
const mainRouter = require('./server/routes/main'); 

const app = express();

const connectDB = require('./server/config/db');
const PORT = process.env.PORT || 5000;

// Paths for static files and templates
const static_path = path.join(__dirname, './public');
const templates_path = path.join(__dirname, './views');

// Connect to MongoDB
connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use(express.static(static_path));
app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', templates_path);

// Use your routes
app.use('/', mainRouter);
app.use('/blog', blogRouter); // Assuming blogRouter handles routes related to blogs

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

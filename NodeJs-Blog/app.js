require('dotenv').config();

const express = require("express");
const expressLayout = require('express-ejs-layouts');
const path = require("path");
const app = express();

const connectDB = require("./server/config/db");
const PORT = 5000 || process.env.PORT;

const static_path = path.join(__dirname, "./public");
const templates_path = path.join(__dirname, "./views");

// Connect DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use(express.static(static_path));
app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set('layout', "./layouts/main");
app.set('view engine', "ejs");
app.set("views", templates_path);

// Use your routes
app.use('/', require("./server/routes/main"));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

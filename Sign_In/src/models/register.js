const mongoose = require("mongoose");

// Define your schema
const registerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true  },
    password: { type: String, required: true }
});

// Create and export your model
const Register = mongoose.model("Register", registerSchema);
module.exports = Register;

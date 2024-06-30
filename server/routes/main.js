const express = require("express");
const router = express.Router();

// ROutes
router.get("/", (req, res) => {
    const locals = {
        title: "NodeJs Blog",
        description: "Simple Blog Page created using Node JS, Express & MongoDB"
    }
    res.render("index", {locals});
})
router.get("/blog", (req, res)=>{
    res.render("blogs")
})
router.get("/about", (req, res)=>{
    res.render("about")
})
router.get("/contact", (req, res)=>{
    res.render("contact")
})
router.get("/signIn", (req, res)=>{
    res.render("signIn")
})

module.exports = router;
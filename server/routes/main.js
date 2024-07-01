const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { create } = require("connect-mongo");
const upload = require("../models/upload");
const { postImage } = require("../models/controller");
// ROutes

/**
 * GET /
 * HOME
*/
// router.get("/", async (req, res) => {
//     try{
//         const locals = {
//             title: "NodeJs Blog",
//             description: "Simple Blog Page created using Node JS, Express & MongoDB"
//         }
//         let perPage = 10;
//         let page = req.query.page || 1;

//         const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
//         .skip(perPage * page - perPage)
//         .limit(perPage)
//         .exec();

//         const count = await Post.countDocuments({});
//         const nextPage = parseInt(page) + 1;
//         const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        
//         res.render("index", {
//             locals ,
//             data,
//             current: page,
//             nextPage: hasNextPage ? nextPage: null, // If there is a next page then it will load it or not
//             currentRoute: "/"
//         });
//     }catch(error) {
//         console.log(error);
//     }
// });

router.get('', async (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express & MongoDb."
  }

  try {
    const data = await Post.find();
    res.render('index', { locals, data });
  } catch (error) {
    console.log(error);
  }

});

// Code without Pagination and how to add data on github

router.post("/", upload.single("image"), postImage);


router.get("/about", (req, res) => {
    res.render("about")
})
router.get("/contact", (req, res) => {
    res.render("contact")
})

module.exports = router;
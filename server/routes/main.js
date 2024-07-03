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
router.get("/", async (req, res) => {
    try{
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog Page created using Node JS, Express & MongoDB"
        }
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        
        res.render("index", {
            locals ,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage: null, // If there is a next page then it will load it or not
            currentRoute: "/"
        });
    }catch(error) {
        console.log(error);
    }
});

// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });

// Code without Pagination and how to add data on github

// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//       filename: "Image1",
//       filepath: "C:\Users\kanis\OneDrive\Pictures\Camera Roll\Image1.jpg"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments...",
//       filename: "Image2",
//       filepath: "C:\Users\kanis\OneDrive\Pictures\Camera Roll\Image2.jpg"
//     },
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//       filename: "Image3",
//       filepath: "C:\Users\kanis\OneDrive\Pictures\Camera Roll\Image3.jpg"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments...",
//       filename: "Image4",
//       filepath: "C:\Users\kanis\OneDrive\Pictures\Camera Roll\Image1.jpg"
//     },
//   ])
// }
// insertPostData();

router.post("/", upload.single("image"), postImage);

router.get('/post/:id', async (req, res) => { // Individual post ka page
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      }
  
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
  res.render("AddBlog")
})

router.get("/about", (req, res) => {
    res.render("about")
})
router.get("/signIn", (req, res) => {
  res.render("signIn")
})
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
    res.render("individualBlog")
})

module.exports = router;
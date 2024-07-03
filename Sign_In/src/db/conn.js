const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Blog_Signin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected`);
}).catch((e) => {
    console.log(`Not Connected`);
    console.error(e);
});

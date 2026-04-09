var express = require("express")
var router = express.Router();
const passport = require("passport")
const userModel = require("./users")
const postModel = require("./posts")

const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))
// router.get('/allUsers', async function (req,res){
//     let user = await userModel
//     .findOne({_id: "69d530df21de3c4ac974b658"})
//     .populate('posts')
//     res.send(user)
// })

// router.get('/createUser',async function(req,res){
//     let createdUser = await userModel.create({
//   username: "dev775",
//   password: "dev@123",
//   fullname:"devansh agarwal",
//   email: "dev@gmail.com",
//   posts: []
//     })
//     res.send(createdUser)
// })

// router.get('/createPost',async function(req,res){
//     let createdPost = await postModel.create({
//   postText:"Hello Good Morning Guys",
//   user: "69d530df21de3c4ac974b658"
// })
//     let user = await userModel.findOne({_id: "69d530df21de3c4ac974b658"})
//     user.posts.push(createdPost._id)
//     await user.save()
//     res.send("done")
// })


router.get('/',function(req,res){
    res.render('index')
})

router.get("/profile", isLoggedIn,async function(req,res,next){
    const user = await userModel.findOne({
        username: req.session.passport.user
    })
    res.render("profile",{user})
})

router.get('/login',function(req,res,next){
    // console.log(req.flash("error"))
    res.render('login',{error: req.flash('error')})
})

router.get('/feed',function(req,res){
    res.render('feed')
})

router.post("/register", async function(req, res) {
    try {
        console.log("BODY:", req.body); // debug

        const userData = new userModel({
            username: req.body.username,
            email: req.body.email,
            fullname: req.body.fullname
        });

        const registeredUser = await userModel.register(userData, req.body.password);

        console.log("Saved:", registeredUser);

        passport.authenticate("local")(req, res, function() {
            res.redirect("/profile");
        });

    } catch (err) {
        console.log("ERROR:", err);
        res.send(err.message); // show error in browser
    }
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}), function(req,res){
});

router.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/')
    })
})

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()) return next()
    res.redirect("/login")    
}
module.exports=router;
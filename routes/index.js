var express = require("express")
var router = express.Router();
const userModel = require("./users")
const postModel = require("./posts")

router.get('/allUsers', async function (req,res){
    let user = await userModel
    .findOne({_id: "69d530df21de3c4ac974b658"})
    .populate('posts')
    res.send(user)
})

router.get('/createUser',async function(req,res){
    let createdUser = await userModel.create({
  username: "dev775",
  password: "dev@123",
  fullname:"devansh agarwal",
  email: "dev@gmail.com",
  posts: []
    })
    res.send(createdUser)
})

router.get('/createPost',async function(req,res){
    let createdPost = await postModel.create({
  postText:"Hello Good Morning Guys",
  user: "69d530df21de3c4ac974b658"
})
    let user = await userModel.findOne({_id: "69d530df21de3c4ac974b658"})
    user.posts.push(createdPost._id)
    await user.save()
    res.send("done")
})

module.exports=router;
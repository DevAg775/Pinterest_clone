const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  
  fullname: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  dp: {
    type: String, // profile image URL
    default: "default.png"
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }

  ]

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/newpin");
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log("DB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
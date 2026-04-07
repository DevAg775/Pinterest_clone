const express = require("express");
const app = express();

const connectDB = require("./config/db");
const indexRouter = require("./routes/index");


connectDB();

app.use("/", indexRouter);

app.listen(3000);
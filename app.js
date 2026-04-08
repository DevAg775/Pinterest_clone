const express = require("express");
const app = express();
const passport = require("passport");
const expressSession = require("express-session")
// const localStrategy = require("passport-local");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


const connectDB = require("./config/db");
const indexRouter = require("./routes/index");
const userModel = require("./routes/users")



connectDB();

app.set("view engine",'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret: "dasasd"
}))

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new localStrategy(userModel.authenticate())); 
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use("/", indexRouter);


app.listen(3000);
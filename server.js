const express = require("express"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      bodyParser = require("body-parser"),
      User = require("./models/user"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/movie_app", {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(require("express-session")({
  secret: "Expecto Patronum",
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=============================
//ROUTES

app.get("/", function(req,res) {
  res.render("home")
  // res.send("hello")
});

app.get("/secret", isLoggedIn, function(req,res) {
  res.render("secret")
});

//AUTH ROUTES

//show sign up form
app.get("/register", function(req,res) {
  res.render("register")
  // res.send("hello from register")
});

//handle user sign up
app.post("/register", function(req,res) {
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err,user) {
    if(err) {
      console.log(err)
      res.render('register')
    } else {
      passport.authenticate("local")(req,res, function() {
        res.redirect("/")
      })
    }
  })
});

//LOGIN ROUTES

//render login form
app.get("/login", function(req,res) {
  res.render("login")
});

//login logic
app.post("/login", passport.authenticate("local" , {
  successRedirect: "/",
  failureRedirect: "/login"
}) ,function(req,res) {

});

app.get("/logout", function(req,res) {
  req.logout();
  res.redirect("/")
});

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
};

app.listen(3000, () => {
  console.log("Server Started!!!🌎🌎🌎")
});
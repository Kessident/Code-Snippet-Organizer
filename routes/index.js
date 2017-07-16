const express = require('express');
const router  = express.Router();
const Models = require("../models");
const snippetRouter = require("./snippet-router");
let messages = [];

router.use("/snippets", snippetRouter);

router.get('/', function(req, res) {
  if (req.session.username){
    res.render("index", {errors:req.session.submitErrors});
  } else {
    res.redirect("/signin");
  }
});

router.get("/signin", function(req, res){
  if (req.session.username){
    res.redirect("/");
  } else {
    res.render("signin", {errors:req.session.submitErrors});
  }
});

router.post("/signin", function(req, res){
  req.session.submitErrors = [];
  Models.users.find({
    where:{
      username:req.body.username,
      password:req.body.password
    }}).then(function (user) {
      if (user){
        req.session.username = user.username;
        res.redirect("/");
      } else {
        req.session.submitErrors.push("Invalid username/password");
        res.redirect("/signin");
      }
    });
});

router.get("/signup", function(req, res){
  res.render("signup", {errors:req.session.submitErrors});
});

router.post("/signup", function(req, res){
  req.session.submitErrors = [];

  Models.users.findOrCreate({
    where:{username:req.body.username},
    defaults:{password:req.body.password}})
    .then(function (user) {
      if (user){
        if (user[1]) {
          res.redirect("/signin");
        } else {
          req.session.submitErrors.push("User already exists");
          res.redirect("/signup");
        }
      } else {
        res.redirect("/signin");
      }
  });
});

router.get("/logout", function(req, res){
  // req.session.destroy();
  res.redirect("/");
});

module.exports = router;

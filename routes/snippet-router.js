const express = require("express");
const router = express.Router();
const Models = require("../models");

router.get("/",function (req,res) {
  Models.snippets.findAll().then(function (data) {
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  });
});

router.post("/", function(req, res){
  req.session.submitErrors = [];
  req.checkBody("title", "Title required").notEmpty();
  req.checkBody("body", "Body required").notEmpty();
  req.checkBody("language", "Language required").notEmpty();

  let errors = req.validationErrors();

  if (errors){
    for (var i = 0; i < errors.length; i++) {
      req.session.submitErrors.push(errors[i].msg);
    }
    res.redirect("/");
  } else{
    Models.snippets.create(req.body).then(function (snippet) {
      res.redirect("/");
    });
}
});

module.exports = router;

const express = require("express");
const mongoose = require("../models/init");

const User = mongoose.model("User");
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    User.find()
      .then((result) => {
        return res.json(result);
      })
      .catch((error) => {
        return next(error);
      });
  })
  .post((req, res, next) => {
    let user = new User();
    // user.url = req.body.url;
    // user.title = req.body.title;
    user
      .save()
      .then(() => {
        res.json(user);
      })
      .catch((error) => {
        return next(error);
      });
  });

module.exports = router;

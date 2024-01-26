const express = require("express");
const mongoose = require("../models/init");

const User = mongoose.model("User");
const router = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/current", isLoggedIn, (req, res, next) => {
  console.log(req.user);
  User.findOne({ _id: req.user.id })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = router;

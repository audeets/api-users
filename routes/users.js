const express = require("express");
const mongoose = require("../models/init");
const { isUserAuthenticated } = require("../middlewares/auth");

const User = mongoose.model("User");
const router = express.Router();

router.get("/current", isUserAuthenticated, (req, res, next) => {
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

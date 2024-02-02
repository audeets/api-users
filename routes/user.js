const express = require("express");
const mongoose = require("@benoitquette/audeets-api-commons/models");
const {
  isUserAuthenticated,
} = require("@benoitquette/audeets-api-commons/middlewares/auth");

const User = mongoose.model("User");
const router = express.Router();

router.get("/", isUserAuthenticated, (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send("logged out");
  });
});

module.exports = router;

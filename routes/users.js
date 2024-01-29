const express = require("express");
const mongoose = require("@benoitquette/audeets-api-commons/models");
const {
  isUserAuthenticated,
} = require("@benoitquette/audeets-api-commons/middlewares/auth");

const User = mongoose.model("User");
const router = express.Router();

router.get("/current", isUserAuthenticated, (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = router;

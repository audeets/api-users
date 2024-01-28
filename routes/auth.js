const express = require("express");
const passport = require("passport");
const mongoose = require("../models/init");

const User = mongoose.model("User");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_BASE_URL}${process.env.AUTH_SUCCESS_URL}`,
    failureRedirect: `${process.env.CLIENT_BASE_URL}${process.env.AUTH_FAILURE_URL}`,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

module.exports = router;

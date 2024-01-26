"use strict";

/**
 * Module dependencies
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const users = require("./routes/users");
require("./auth/google");
const auth = require("./routes/auth");

// end module dependencies

// Express setup
var app = express();
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_BASE_URL);

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", users);
app.use("/api/auth", auth);

module.exports = app;

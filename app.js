"use strict";

/**
 * Module dependencies
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const bodyParser = require("body-parser");
const users = require("./routes/users");
require("./auth/google");
require("@benoitquette/audeets-api-commons/auth/passport");
const auth = require("./routes/auth");

// end module dependencies

// Express setup
var app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_BASE_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
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
    store: MongoStore.create({
      mongoUrl: process.env.URL_MONGO,
    }),
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

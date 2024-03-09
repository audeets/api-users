import express from "express";
import cookieParser from "cookie-parser";
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./auth/google");
require("@benoitquette/audeets-api-commons/auth/passport");
const authRoute = require("./routes/auth");

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
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: false,
      sameSite: "none",
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
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

export default app;

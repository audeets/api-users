const passport = require("passport");
const mongoose = require("../models/init");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = mongoose.model("User");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id })
        .then((result) => {
          let user = result;
          if (!user) {
            user = new User();
          }
          user.name = profile.displayName;
          user.googleId = profile.id;
          user.email = profile.email;
          user.photo = profile.picture;
          user.save().then(() => {
            return cb(null, user);
          });
        })
        .catch((error) => {
          return cb(error);
        });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, name: user.displayName, image: user.picture });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

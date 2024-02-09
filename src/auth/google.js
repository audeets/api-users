import passport from "passport";
import mongoose from "@benoitquette/audeets-api-commons/models/index.js";
import { Strategy } from "passport-google-oauth2";

const init = () => {
  const User = mongoose.model("User");
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
        state: true,
      },
      function (request, accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id })
          .then((result) => {
            let user = result;
            if (!user) {
              user = new User();
              user.projectsMax = process.env.PROJECT_MAX;
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
};

export default { init };

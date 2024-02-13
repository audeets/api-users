import passport from "passport";
import mongoose from "@benoitquette/audeets-api-commons/models/index.js";
import { Strategy } from "passport-google-oauth2";
import nodemailer from "nodemailer";

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
              notify(profile);
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

const notify = (profile) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: "[audeets] new user registered",
    text: JSON.stringify(profile),
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

export default { init };

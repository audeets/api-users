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
var querystring = require("querystring");

const checkReturnTo = (req, res, next) => {
  var returnTo = req.query["returnTo"];
  if (returnTo) {
    req.session = req.session || {};
    req.session.returnTo = `${
      process.env.CLIENT_BASE_URL
    }${querystring.unescape(returnTo)}`;
  }
  next();
};

module.exports = { checkReturnTo };

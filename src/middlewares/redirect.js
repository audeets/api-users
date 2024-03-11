import querystring from 'querystring';

export const checkReturnTo = (req, res, next) => {
  var returnTo = req.query['returnTo'];
  if (returnTo) {
    req.session = req.session || {};
    req.session.returnTo = `${process.env.CLIENT_BASE_URL}${querystring.unescape(returnTo)}`;
  }
  next();
};

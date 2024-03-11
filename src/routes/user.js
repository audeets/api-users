import express from 'express';
import mongoose from '@benoitquette/audeets-api-commons/models/index.js';
import { isUserAuthenticated } from '@benoitquette/audeets-api-commons/middlewares/auth.js';

const User = mongoose.model('User');
const router = express.Router();

router.get('/', isUserAuthenticated, (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return next(error);
    });
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send('logged out');
  });
});

export default router;

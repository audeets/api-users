import express from 'express';
import passport from 'passport';
import { checkReturnTo } from '../middlewares/redirect.js';

const router = express.Router();

router.get('/google', checkReturnTo, passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: `${process.env.CLIENT_BASE_URL}${process.env.AUTH_SUCCESS_URL}`,
    failureRedirect: `${process.env.CLIENT_BASE_URL}${process.env.AUTH_FAILURE_URL}`,
    keepSessionInfo: true
  })
);

export default router;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // We only really need to store and use the access and refresh tokens when we
      // have asked permission to modify things on the user's google account.
      // In this case we're just dealing with simple auth and the user's email and profile
      // so don't need these.
      console.log('access token: ', accessToken);
      console.log('refresh token: ', refreshToken);
      console.log('profile', profile);
    }
  )
);

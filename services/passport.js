const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Rational for not using module.exports and require here...
// Testing suites like mocha might require mongoose models multiple times.
// It will think you're trying to load in multiple user models. Usually this only
// happens in testing environments.
// Basically we pull out the User model from mongoose, rather than from our original User.js file.
// This works, since index.js already loaded the User.js file into mongoose, when requiring User.js.
const User = mongoose.model('users');

/**
 * Tell passport to generate an authentication cookie using the ID of the mongo
 * document for the user's browser.
 *
 * The 'user' argument here is coming straight from our 'done' callback below after
 * our User.findOne() query.
 */
passport.serializeUser((user, done) => {
  // 'null' argument represents an error. If no error, pass null.
  // user.id is the mongo object id (not the Googleid). Mongo references .id to User._id.oid
  done(null, user.id);

  // Obviously it's a terrible idea to use the GoogleId for generating identific.ation cookies, since
  // the id wouldn't work with local strategy, facebook or any other strategy.
});

/**
 * Tell passport to process authentication cookie's when a request arrives from the User's browser.
 *
 * @param id String
 *   The Mongo document id previously added to the user's cookies.
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
});

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

      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // Let passport know we're finished and it should continue the authentication process.
            done(null, existingUser);
          }
          else {
            // Save a new user.
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        });
    }
  )
);

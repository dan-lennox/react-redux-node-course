const passport = require('passport');

module.exports = (app) => {

  // Send the user to google oauth.
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // Handle the return authentication code.
  app.get('/auth/google/callback', passport.authenticate('google'));

  // Test user authentication.
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
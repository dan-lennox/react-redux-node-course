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
  app.get(
    '/auth/google/callback',
    // Middleware (could be any function).
    passport.authenticate('google'),
    // Route handler.
    (req, res) => {
      // Redirect after succesfull login.
      res.redirect('/surveys');
    }
  );

  // Handle logout request.
  app.get('/api/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


  // Test user authentication.
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
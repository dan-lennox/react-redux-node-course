"use strict";

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
// This will execute the code inside the file, regardless of lack of module.exports
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// Standard express setup. Add body-parser middlewhere to parse
// request body to json automatically.
app.use(bodyParser.json());

// Tell express to use session cookies.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] // Cookie encryption
  })
);

// Tell passport to use cookies for authentication.
app.use(passport.initialize());
app.use(passport.session());

// Neat trick!
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Locally, we have create-react-app running a front end server. So we have both a
// front and back end server and is just so we have a convieniant dev environment (auto rebuilding etc)
// On production however, we want/need express to handle everything.
if (process.env.NODE_ENV === 'production') {
  // Ensure express will serve up production assets, like main.js or main.css
  // Express has a built in middleware for just this purpose (express.static);
  app.use(express.static('client/build'));

  // Express will serve up the index.html file if it doesn't recognise the route. (Passing the route
  // handling onto React Router.
  // Target any url that hasn't already been been caught by our required in routes above.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Dynamic port binding.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
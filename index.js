"use strict";

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
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

// Dynamic port binding.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
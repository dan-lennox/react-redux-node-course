"use strict";

const express = require('express');
// This will execute the code inside the file, regardless of lack of module.exports
require('./services/passport');

const app = express();

// Neat trick!
require('./routes/authRoutes')(app);

// Dynamic port binding.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
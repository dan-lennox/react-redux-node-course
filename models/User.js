const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; // This is equivalent to the line above, but uses ES6 object destructuring.

const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});

// This actually tells mongo to go and create a new collection called 'users';
mongoose.model('users', userSchema);

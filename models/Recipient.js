const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// We don't register sub document schema's with mongoose via mongoose.model()
// instead we just export the Schema.
module.exports = recipientSchema;
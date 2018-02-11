const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  // Object reference fields prefixed with an underscore by convention.
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// We do this instead of directly doing - const survey = require('../models/survey');
// in order to ensure compatibility with various testing frameworks.
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

    // How awesome is object destructuring...
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      _user: req.user.id,
      title, // When the key and value are the same, we can just do this instead of title: title (es6 thing).
      subject,
      body,
      // Without es6 cleanup
      // recipients: recipients.split(',').map(email => { return { email: email }; }),
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};
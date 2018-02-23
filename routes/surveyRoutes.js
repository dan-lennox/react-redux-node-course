const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const axios = require('axios');

// We do this instead of directly doing - const survey = require('../models/survey');
// in order to ensure compatibility with various testing frameworks.
const Survey = mongoose.model('surveys');

module.exports = (app) => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

    console.log('called the endpoint!!! ==============================');

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

    try {

      const mailer = new Mailer(survey, surveyTemplate(survey));
      //mailer.send().catch(error => console.log(error));

      await mailer.send();

      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    }
    catch (err) {
      res.status(422).send(err);
    }
  });
};
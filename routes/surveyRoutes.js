const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
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

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {

    const parser = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url}) => {
        const match = parser.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice};
        }
      })
      // _.compact removes undefined elements.
      .compact()
      // Remeve any duplicates that have the same email and surveyId.
      .uniqBy('email', 'surveyId')
      .each(({ surveyid, email, choice}) => {

        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          // $inc is "increment" (this property yes/no property). Alternative to $set that does $set and increment.
          // [choice] is es6 "key interpolation". Can't use choice variable directly at runtime.
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true }, // We use $set when we need to substitute with $
          lastResponded: new Date() // Otherwise we can just set like this.
        }).exec();
      })
      .value();

    // Let sendgrid know the webhook request was successful.
    res.send({});
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
      console.log(err);
      res.status(422).send(err);
    }
  });
};
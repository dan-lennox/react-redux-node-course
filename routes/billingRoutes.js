const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = (app) => {
  // Send the stripe auth token back to stripe.
  app.post('/api/stripe', requireLogin, async (req, res) => {

    // We can use async/await whenever a promise is returned (we could of used .then() here).
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
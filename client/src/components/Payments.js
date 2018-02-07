import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500} // 500 cents USD
        token={token => this.props.handleStripeToken(token)} // Callback function, to which stripe sends the auth token.
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  };
}

// @todo: Why do we need to do this when the App component already has the actions as props??
export default connect(null, actions)(Payments);
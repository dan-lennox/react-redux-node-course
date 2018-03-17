import axios from 'axios';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  // res.data should be an updated user model. So we update the data store
  // in the same way as the initial user authorisation 'fetchUser' action creator.
  // So this is a different 'Action creator' that uses the SAME 'action' (FETCH_USER).
  dispatch({ type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  // Redirect to the surveys page.
  history.push('/surveys');
  // update user model, since we will have now spent a credit.
  dispatch({ type: FETCH_USER, payload: res.data});
};

// Our Redux thunk middleware will catch the fact that we're returning a function
// rather than a regular redux action object.
// This way we get direct access to the dispatch function so that we can work asynchronosly
// rather than returning and firing the action immediately (e.g, so we can wait for a request
// to return before we update the store and therefore the UI).

// JS ES6 Quirk. With a => function, if there's only one expression, then you don't need
// a return statement or curly braces. (This is why we don't have { return function(dispatch' ... }
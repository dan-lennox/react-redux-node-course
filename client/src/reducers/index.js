import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,  // The 'auth' piece of state is managed by our authReducer.
  form: reduxFormReducer,
  surveys: surveysReducer
});
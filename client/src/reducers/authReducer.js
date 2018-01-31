import { FETCH_USER} from '../actions/types';


// Having a null return value for state on all reducers allows us to have a default
// 'unknown or incomplete state for our actions. For instance, if the Fetch User action
// has not yet completed, we can initially display nothing in the header, instead of the elements
// that appear for authenticated or unauthenticated users.

export default function(state = null, action) {
  switch (action.type) {

    case FETCH_USER:
      // User is logged in: action.payload is the UserModel.
      return action.payload || false;
    default:
      return state;
  }
}
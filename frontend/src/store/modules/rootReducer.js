import { combineReducers } from 'redux';

import session from './session/reducer';
import user from './user/reducer';
import signin from './signin/reducer';

export default combineReducers({
  session,
  user,
  signin,
});

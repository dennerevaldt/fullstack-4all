import { all } from 'redux-saga/effects';

import session from './session/sagas';
import user from './user/sagas';
import signin from './signin/sagas';

export default function* rootSaga() {
  return yield all([session, user, signin]);
}

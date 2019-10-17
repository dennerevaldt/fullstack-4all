import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { signInSuccess, signInFailure } from './actions';
import { sessionRequest } from '../session/actions';
import { signInConstants } from '~/constants/signin';

function* signinRequest({ data }) {
  try {
    const response = yield call(api.post, '/users', data);

    yield put(signInSuccess(response.data));

    yield put(sessionRequest(response.data.cpf));
  } catch (err) {
    const { error } = err.response.data;
    const message = Array.isArray(error) ? error.message[0] : error;

    toast.error(message);
    yield put(signInFailure(error));
  }
}

export default all([
  takeLatest(signInConstants.SIGN_IN_REQUEST, signinRequest),
]);

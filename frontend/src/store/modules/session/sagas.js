import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { sessionSuccess, sessionFailure } from './actions';
import { sessionConstants } from '~/constants/session';

function* sessionRequest({ cpf }) {
  try {
    const response = yield call(api.post, '/sessions', { cpf });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(sessionSuccess(response.data));

    history.push('/dashboard');
  } catch (err) {
    const { error } = err.response.data;
    const message = Array.isArray(error) ? error.message[0] : error;

    toast.error(message);
    yield put(sessionFailure(error));
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.session;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logout() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(sessionConstants.SESSION_REQUEST, sessionRequest),
  takeLatest(sessionConstants.LOGOUT, logout),
]);

import { sessionConstants } from '~/constants/session';

export function sessionRequest(cpf) {
  return {
    type: sessionConstants.SESSION_REQUEST,
    cpf,
  };
}

export function sessionSuccess(session) {
  return {
    type: sessionConstants.SESSION_SUCCESS,
    session,
  };
}

export function sessionFailure(error) {
  return {
    type: sessionConstants.SESSION_FAILURE,
    error,
  };
}

export function logout() {
  return {
    type: sessionConstants.LOGOUT,
  };
}

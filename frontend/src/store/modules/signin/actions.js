import { signInConstants } from '~/constants/signin';

export function signInRequest(data) {
  return {
    type: signInConstants.SIGN_IN_REQUEST,
    data,
  };
}

export function signInSuccess(user) {
  return {
    type: signInConstants.SIGN_IN_SUCCESS,
    user,
  };
}

export function signInFailure(error) {
  return {
    type: signInConstants.SIGN_IN_FAILURE,
    error,
  };
}

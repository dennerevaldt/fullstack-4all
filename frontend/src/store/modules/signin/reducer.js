import { signInConstants } from '~/constants/signin';

export default function signin(state = {}, action) {
  switch (action.type) {
    case signInConstants.SIGN_IN_REQUEST:
      return { ...state, ...action.user, loading: true };
    case signInConstants.SIGN_IN_SUCCESS:
      return { ...state, ...action.user, loading: false };
    case signInConstants.SIGN_IN_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

import { sessionConstants } from '~/constants/session';

const INITIAL_STATE = {
  token: null,
  logged: false,
  loading: false,
};

export default function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    case sessionConstants.SESSION_REQUEST:
      return { ...state, loading: true };
    case sessionConstants.SESSION_SUCCESS:
      return { ...state, ...action.session, logged: true, loading: false };
    case sessionConstants.SESSION_FAILURE:
      return { ...state, logged: false, loading: false };
    case sessionConstants.LOGOUT:
      return { ...state, token: null, logged: false, loading: false };
    default:
      return state;
  }
}

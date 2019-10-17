import { sessionConstants } from '~/constants/session';

const INITIAL_STATE = {
  user: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case sessionConstants.SESSION_SUCCESS:
      return { ...state, user: action.session.user };
    case sessionConstants.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}

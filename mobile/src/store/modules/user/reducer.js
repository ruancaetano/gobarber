import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  loadingUpdate: false,
};

export default function userReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS':
        draft.profile = action.payload.user;
        break;
      case '@user/UPDATE_PROFILE_REQUEST':
        draft.loadingUpdate = true;
        break;
      case '@user/UPDATE_PROFILE_SUCCESS':
        draft.profile = action.payload.profile;
        draft.loadingUpdate = false;
        break;
      case '@user/UPDATE_PROFILE_FAILURE':
        draft.loadingUpdate = false;
        break;
      case '@auth/SIGN_OUT':
        draft.profile = null;
        break;
      default:
        return state;
    }
    return state;
  });
}

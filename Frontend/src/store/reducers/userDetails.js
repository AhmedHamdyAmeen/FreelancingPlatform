const INITIAL_STATE = {};

export default function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return action.payload;
    case "UPDATE_USER_DETAILS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

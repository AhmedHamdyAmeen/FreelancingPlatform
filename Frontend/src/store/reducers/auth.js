const INITIAL_STATE = { id: 1, role: "company" };

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

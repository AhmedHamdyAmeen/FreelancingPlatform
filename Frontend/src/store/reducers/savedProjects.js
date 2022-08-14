const INITIAL_STATE = {
  savedProjects: [],
};

export default function savedProjectsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_SAVED_PROJECTS":
      console.log(state);
      if (state.savedProjects.some((e) => e._id === action.payload._id)) {
        return {
          savedProjects: [
            ...state.savedProjects.filter((e) => e._id !== action.payload._id),
          ],
        };
      } else {
        return { savedProjects: [...state.savedProjects, action.payload] };
      }
    default:
      return state;
  }
}

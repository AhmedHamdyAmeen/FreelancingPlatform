import { combineReducers } from "redux";
import userReducer from "./userDetails";
import authReducer from "./auth";
import savedProjectsReducer from "./savedProjects";

export default combineReducers({
  user: authReducer,
  userDetails: userReducer,
  savedProjectsReducer,
});

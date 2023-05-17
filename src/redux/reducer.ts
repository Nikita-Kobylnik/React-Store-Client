import { combineReducers } from "redux";
import { userSliceReducer } from "./slices/userSlice";
const reducer = combineReducers({
  user: userSliceReducer,
});

export default reducer;

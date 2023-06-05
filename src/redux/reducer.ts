import { combineReducers } from "redux";
import { userSliceReducer } from "./slices/userSlice";
import { cartSliceReducer } from "./slices/cartSlice";
const reducer = combineReducers({
  user: userSliceReducer,
  cart: cartSliceReducer,
});

export default reducer;

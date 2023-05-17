import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../interfaces/userInterface";

interface UserSliceState {
  user: IUser | null;
}

const initialState: UserSliceState = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
export const selectUserSlice = (state: RootState) => state.user;

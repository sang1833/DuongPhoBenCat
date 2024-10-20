import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StreetInfo } from "../types";

interface StreetState {
  currentStreet: StreetInfo | null;
}

const initialState: StreetState = {
  currentStreet: null
};

const modalSlice = createSlice({
  name: "street",
  initialState,
  reducers: {
    addCurrentStreet: (
      state,
      action: PayloadAction<{
        currentStreet: StreetInfo;
      }>
    ) => {
      state.currentStreet = action.payload.currentStreet;
    },
    removeCurrentStreet: (state) => {
      state.currentStreet = null;
    }
  }
});

export const { addCurrentStreet, removeCurrentStreet } = modalSlice.actions;
export default modalSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface PopupState {
  isOpen: boolean;
  header: string;
  content: ReactNode;
}

const initialState: PopupState = {
  isOpen: false,
  header: "",
  content: ""
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup(
      state,
      action: PayloadAction<{ header: string; content: string }>
    ) {
      state.isOpen = true;
      state.header = action.payload.header;
      state.content = action.payload.content;
    },
    closePopup(state) {
      state.isOpen = false;
      state.header = "";
      state.content = "";
    }
  }
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;

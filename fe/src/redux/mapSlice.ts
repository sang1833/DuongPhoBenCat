import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StreetState {
  center: [number, number];
  zoom: number;
}

const initialState: StreetState = {
  center: [11.1605595, 106.584514],
  zoom: 13
};

const modalSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addMapState: (
      state,
      action: PayloadAction<{
        center: [number, number];
        zoom: number;
      }>
    ) => {
      state.center = action.payload.center;
      state.zoom = action.payload.zoom;
    },
    removeMapState: (state) => {
      state.center = [11.1605595, 106.584514];
      state.zoom = 13;
    }
  }
});

export const { addMapState, removeMapState } = modalSlice.actions;
export default modalSlice.reducer;

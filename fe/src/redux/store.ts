import { configureStore } from "@reduxjs/toolkit";
import streetSlice from "./StreetSlice";
import mapSlice from "./mapSlice";
import popupSlice from "./popupSlice";

const store = configureStore({
  reducer: {
    street: streetSlice,
    mapState: mapSlice,
    popup: popupSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

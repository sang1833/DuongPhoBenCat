import { configureStore } from "@reduxjs/toolkit";
import streetSlice from "./StreetSlice";
import mapSlice from "./mapSlice";

const store = configureStore({
  reducer: {
    street: streetSlice,
    mapState: mapSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

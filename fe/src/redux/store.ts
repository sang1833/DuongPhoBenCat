import { configureStore } from "@reduxjs/toolkit";
import streetSlice from "./StreetSlice";

const store = configureStore({
  reducer: {
    street: streetSlice
  }
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { ModalReducer } from "@components";

const store = configureStore({
  reducer: {
    modal: ModalReducer
  }
});

export default store;

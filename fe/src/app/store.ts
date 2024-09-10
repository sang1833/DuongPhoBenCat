import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { StreetSlice } from "@components";

// Define your root reducer
const rootReducer = combineReducers({
  street: StreetSlice
});

// Define your persist config
const persistConfig = {
  key: "root",
  version: 1.1,
  storage: storage
};

// Define your persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define your store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.headers"],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

// persistor
//   .purge()
//   .then(() => {
//     console.log("Data reset successful");
//   })
//   .catch(() => {
//     console.log("Data reset failed");
//   });

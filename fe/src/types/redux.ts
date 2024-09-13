import { PersistPartial } from "redux-persist/es/persistReducer";
import { store } from "../app/store";

export type RootState = ReturnType<typeof store.getState> & PersistPartial;
export type AppDispatch = typeof store.dispatch;

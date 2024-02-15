import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// I used redux-persist to save data during refresh

const rootReducer = combineReducers({
  // Combine all your reducers
  auth: authReducer,
  // other reducers go here...
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // You can choose which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware and other store enhancers can be added here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

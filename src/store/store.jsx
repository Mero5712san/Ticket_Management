import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session"; // Use sessionStorage instead of localStorage
import { persistReducer, persistStore } from "redux-persist";
import { CreateGoal } from "../slice/CreateGoal";

// Create persist configuration with sessionStorage
const persistConfig = {
  key: "root", // This is the key used in sessionStorage to store the persisted state
  storage: storageSession, // Use sessionStorage
};

// Combine your reducers
const rootReducer = combineReducers({
  createGoal: CreateGoal,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
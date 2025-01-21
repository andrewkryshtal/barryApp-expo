// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import { userSlice } from "./user/userSlice";
import { coreSlice } from "./core/coreBuilder";

const persistConfig = {
  key: "root",
  storage: ExpoFileSystemStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    core: coreSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // often needed for RN/Expo
    }),
});

// You must export the persistor to use in <PersistGate />
export const persistor = persistStore(store);

// RootState & AppDispatch for usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

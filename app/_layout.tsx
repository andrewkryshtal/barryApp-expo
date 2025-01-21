import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  // const locale = useLocalization();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

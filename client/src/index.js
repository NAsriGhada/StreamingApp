import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store"; 
import { persistStore } from "redux-persist";
import App from "./App";

let persistor = persistStore(store);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root.

root.render(
  // Use the render method on the root.
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

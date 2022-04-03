import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import LayoutProvider from "./LayoutProvider";

ReactDOM.render(
  <LayoutProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </LayoutProvider>,
  document.getElementById("root")
);

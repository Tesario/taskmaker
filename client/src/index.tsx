import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import LayoutProvider from "./LayoutProvider";
import FilterProvider from "./FilterProvider";

ReactDOM.render(
  <LayoutProvider>
    <FilterProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FilterProvider>
  </LayoutProvider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import LayoutProvider from "./LayoutProvider";
import FilterProvider from "./FilterProvider";
import BreadcrumpProvider from "./BreadcrumpProvider";

ReactDOM.render(
  <LayoutProvider>
    <BreadcrumpProvider>
      <FilterProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </FilterProvider>
    </BreadcrumpProvider>
  </LayoutProvider>,
  document.getElementById("root")
);

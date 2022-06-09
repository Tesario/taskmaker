import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";
import LayoutProvider from "./LayoutProvider";
import FilterProvider from "./FilterProvider";
import BreadcrumpProvider from "./BreadcrumpProvider";
import ThemeProvider from "./ThemeProvider";

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <BreadcrumpProvider>
        <FilterProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </FilterProvider>
      </BreadcrumpProvider>
    </LayoutProvider>
  </Provider>,
  document.getElementById("root")
);

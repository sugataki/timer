import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import StoreProvider from "./Store/index.jsx";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

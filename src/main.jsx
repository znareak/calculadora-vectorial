import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "inter-ui/inter.css";
import "normalize.css/normalize.css";
import "./styles/utils.min.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
  </React.StrictMode>
);

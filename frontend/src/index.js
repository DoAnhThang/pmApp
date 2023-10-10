import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ConfigProvider locale={viVN}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

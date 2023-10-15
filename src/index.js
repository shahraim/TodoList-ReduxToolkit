import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/todos.css";
import "./styles/modal.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
reportWebVitals();

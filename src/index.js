import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const DATA = [
  { id: "todo-0", name: "Comp Phys FP", completed: true },
  { id: "todo-1", name: "WADS FP", completed: false },
  { id: "todo-2", name: "Indonesian FP", completed: false },
  { id : "todo-3", name: "Religion FP", completed: false},
  { id : "todo-4", name: "Ethical Hacking FP", completed: false},
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App assignments={DATA} />
  </React.StrictMode>
);
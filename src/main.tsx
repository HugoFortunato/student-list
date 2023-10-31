import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SchoolControlProvider } from "./contexts/SchoolControlProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SchoolControlProvider>
      <App />
    </SchoolControlProvider>
  </React.StrictMode>
);

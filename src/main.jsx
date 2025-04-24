import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Flower from "./Flower.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Flower />
  </StrictMode>
);

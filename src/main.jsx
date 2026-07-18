import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ShopContextProvider from "./components/shopContext/shopContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ShopContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ShopContextProvider>,
  // </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./api/store/store.ts";
import { Toaster } from "./components/ui/toaster.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Router>
        <Provider store={store}>
        <Toaster />
          <App />
        </Provider>
      </Router>
  </StrictMode>
);

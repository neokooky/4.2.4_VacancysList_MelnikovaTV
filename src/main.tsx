import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <MantineProvider>
        <BrowserRouter basename="/4.2.4_VacancysList_MelnikovaTV">
          <App />
        </BrowserRouter>
      </MantineProvider>
    </StrictMode>
  </Provider>
);

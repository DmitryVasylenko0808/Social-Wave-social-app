import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./core/store.ts";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import uk from "javascript-time-ago/locale/uk";

TimeAgo.addLocale(uk);
TimeAgo.addDefaultLocale(en);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

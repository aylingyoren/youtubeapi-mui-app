import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./components/App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

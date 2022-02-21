import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./components/App/App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="top-right" />
      </CssBaseline>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

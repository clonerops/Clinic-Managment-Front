import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./_cloner/assets/css/index.css";
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routing/AppRoutes";
import { SidebarContextProvider } from "./_cloner/context/sidebarContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <SidebarContextProvider>
                <AppRoutes />
                <ToastContainer />
            </SidebarContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);

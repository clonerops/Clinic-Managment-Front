import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import App from "../App";
import CheckRoute from "./CheckRoute";
import ErrorsPage from "./ErrorsPage";
import AccessDenied from "./AccessDenied";
import Login from "../modules/auth/login/Login";

const { PUBLIC_URL } = process.env;

const AppRoutes: FC = () => {

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
        <Route path="error/*" element={<ErrorsPage />} />
          {Cookies.get("token") ? (
            <>
            
              <Route path="/dashboard/accessDenied" element={<AccessDenied />} />
              <Route path="/*" element={<CheckRoute />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<Login />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };

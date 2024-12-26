import React from "react";

import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import Dashboard from "../modules/Dashboard";
import PatientForm from "../modules/patient/PatientForm";
import PatientList from "../modules/patient/PatientList";
import DocumentList from "../modules/document/DocumentList";
import DoctorList from "../modules/doctor/DoctorList";

const Layout = React.lazy(() => import("../modules/layout/Layout"));

export const routes: RouteProps[] = [
    { path: "auth/*", element: <Navigate to="/dashboard" /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "submit-patient", element: <PatientForm /> },
    { path: "patients", element: <PatientList /> },
    { path: "documents", element: <DocumentList /> },
    { path: "doctors", element: <DoctorList /> },
    // { path: "/users", element: <Users /> },
    // { path: "/permissions", element: <Permissions /> },
    // { path: "/groups", element: <Groups /> },
    // { path: "/questionary_information", element: <QuestionnaireInformation /> },

    { path: "*", element: <Navigate to="/error/404" /> },

];

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route>
                    {routes?.map((route) => (
                        <Route key={route.path} {...route} />
                    ))}
                </Route>
            </Route>
        </Routes>
    );
};

export { PrivateRoutes };

import React from "react";

import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import Dashboard from "../modules/Dashboard";
import PatientForm from "../modules/patient/PatientForm";
import PatientList from "../modules/patient/PatientList";
import DocumentList from "../modules/document/DocumentList";
import DoctorList from "../modules/doctor/DoctorList";
import PatientFileList from "../modules/patientFile/PatientFileList";
import SkinForm from "../modules/print/SkinFormPrint";
import LazerFormPrint from "../modules/print/LazerFormPrint";
import MidWirfyFormPrint from "../modules/print/MidWirfyFormPrint";
import FacialFormPrint from "../modules/print/FacialFormPrint";
import ReferralList from "../modules/referral/ReferralList";

const Layout = React.lazy(() => import("../modules/layout/Layout"));

export const routes: RouteProps[] = [
    { path: "auth/*", element: <Navigate to="/dashboard" /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "submit-patient", element: <PatientForm /> },
    { path: "patients", element: <PatientList /> },
    { path: "documents", element: <DocumentList /> },
    { path: "doctors", element: <DoctorList /> },
    { path: "referrals", element: <ReferralList /> },
    { path: "patient-files", element: <PatientFileList /> },
    { path: "skin-form-print/:patientId/:documentId", element: <SkinForm /> },
    { path: "lazer-form-print/:patientId/:documentId", element: <LazerFormPrint /> },
    { path: "mid-wirfy-form-print/:patientId/:documentId", element: <MidWirfyFormPrint /> },
    { path: "facial-form-print/:patientId/:documentId", element: <FacialFormPrint /> },
    

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

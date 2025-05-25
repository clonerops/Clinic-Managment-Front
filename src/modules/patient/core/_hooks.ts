import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'
import { IPatient, IPatientFilter } from "./_models";
import { IDateFilter, IPatientReport, IPatientReportBasedOfReferral } from "../../report/core/_models";

const useCreateNewPatient = () => useMutation({
    mutationFn: (formData: IPatient) => api.CreateNewPatient(formData),
})
const useFetchPatiens = () => useMutation({
    mutationFn: (filters: IPatientFilter) => api.FetchPatiens(filters),
})
const useFetchPatient = () => useMutation({
    mutationFn: (id: number) => api.FetchPatient(id),
})
const useUpdatePatient = () => useMutation({
    mutationFn: (formData: IPatient) => api.UpdatePatient(formData),
})
const useDeletePatient = () => useMutation({
    mutationFn: (id: number) => api.DeletePatient(id),
})
const useFetchPatienReportBasedOfFile = () => useMutation({
    mutationFn: (filters: IPatientReport) => api.FetchPatientReportBasedOfFile(filters),
})

const useFetchPatienReportBasedOfReferral = () => useMutation({
    mutationFn: (filters: IPatientReportBasedOfReferral) => api.FetchPatientReportBasedOfReferral(filters),
})
const useDownloadPatientExcel = () => useMutation({
    mutationFn: (filters: IDateFilter) => api.DownloadPatientExcel(filters),
})
const useDownloadPatientReportBasedOfFileExcel = () => useMutation({
    mutationFn: (filters: IPatientReport) => api.DownloadPatientReportBasedOfFileExcel(filters),
})
const useDownloadPatientReportBasedOfReferralExcel = () => useMutation({
    mutationFn: (filters: IPatientReportBasedOfReferral) => api.DownloadPatientReportBasedOfReferralExcel(filters),
})



export {
    useCreateNewPatient,
    useFetchPatiens,
    useFetchPatient,
    useUpdatePatient,
    useDeletePatient,
    useFetchPatienReportBasedOfFile,
    useFetchPatienReportBasedOfReferral,
    useDownloadPatientExcel,
    useDownloadPatientReportBasedOfFileExcel,
    useDownloadPatientReportBasedOfReferralExcel
}
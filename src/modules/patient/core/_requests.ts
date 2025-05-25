import { http } from "../../../_cloner/utils/axiosConfig";
import { DownloadExcelBase64File } from "../../../_cloner/utils/downloadFiles";
import { generateURLQueryParam } from "../../../_cloner/utils/queryStringUrl";
import { IDateFilter, IPatientReport, IPatientReportBasedOfReferral } from "../../report/core/_models";
import { IPatient, IPatientFilter } from "./_models";

const CreateNewPatient = async (formData: IPatient) => {
    try {

        const { data } = await http.post("Patient", JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}


const FetchPatiens = async (filters: IPatientFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam("Patient", filters)}`)
        return data

    } catch (error: any) {
        return error.response
    }

}

const FetchPatient = async (id: number) => {
    try {

        const { data } = await http.get(`Patient/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}

const UpdatePatient = async (formData: IPatient) => {
    try {

        const { data } = await http.put(`Patient/${formData.id}`, JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}

const DeletePatient = async (id: number) => {
    try {

        const { data } = await http.delete(`Patient/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}

const FetchPatientReportBasedOfFile = async (filters: IPatientReport) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam("Patient/PatientReportBasedOfFile", filters)}`)
        return data

    } catch (error: any) {
        return error.response
    }

}
const FetchPatientReportBasedOfReferral = async (filters: IPatientReportBasedOfReferral) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam("Patient/PatientReportBasedOfReferralCount", filters)}`)
        return data

    } catch (error: any) {
        return error.response
    }
}

const DownloadPatientExcel = async (filters: IDateFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam("Patient/PatientListExcel", filters)}`)
        DownloadExcelBase64File(data.data, "Patient.xlsx")
        return data

    } catch (error: any) {
        return error.response
    }

}

const DownloadPatientReportBasedOfFileExcel = async (filters: IPatientReport) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam("Patient/PatientReportBasedOfFileExcel", filters)}`)
        DownloadExcelBase64File(data.data, "PatientReport.xlsx")
        return data

    } catch (error: any) {
        return error.response
    }

}
const DownloadPatientReportBasedOfReferralExcel = async (filters: IPatientReportBasedOfReferral) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam("Patient/PatientReportBasedOfReferralCountExcel", filters)}`)
        DownloadExcelBase64File(data.data, "PatientReportReferral.xlsx")
        return data

    } catch (error: any) {
        return error.response
    }
}

export {
    CreateNewPatient,
    FetchPatiens,
    FetchPatient,
    UpdatePatient,
    DeletePatient,
    FetchPatientReportBasedOfFile,
    FetchPatientReportBasedOfReferral,
    DownloadPatientExcel,
    DownloadPatientReportBasedOfFileExcel,
    DownloadPatientReportBasedOfReferralExcel
}
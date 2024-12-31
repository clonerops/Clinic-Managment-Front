export interface IPatientReport {
    documentId?: number | null | undefined
    fromDate?: string | null | undefined
    toDate?: string | null | undefined
}
export interface IPatientReportBasedOfReferral {
    documentId?: number | null | undefined
    fromReferral?: number | null | undefined
    toReferral?: number | null | undefined
    fromDate?: string | null | undefined
    toDate?: string | null | undefined
}
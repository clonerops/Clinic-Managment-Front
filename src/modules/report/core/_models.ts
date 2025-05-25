export interface IDateFilter {
    fromDate?: string | null | undefined
    toDate?: string | null | undefined

}

export interface IPatientReport extends IDateFilter {
    documentId?: number | null | undefined
}
export interface IPatientReportBasedOfReferral extends IDateFilter{
    documentId?: number | null | undefined
    fromReferral?: number | null | undefined
    toReferral?: number | null | undefined
}
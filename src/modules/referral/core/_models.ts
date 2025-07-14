export interface IReferral {
    id?: number | null | undefined,
    referralReason?: string | null | undefined,
    referralDescription?: string | null | undefined,
    referralDate?: string | null | undefined,
    patientFileId?: number | null | undefined,
}


export interface IReferralFilter {
    patientId?: number | string
    documentId?: number | string
    doctorId?: number | string
    fromDate?: string
    toDate?: string
}
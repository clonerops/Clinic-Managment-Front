export interface IPatientFile {
    id?: number | null | undefined,
    fileCode?: string | null | undefined,
    patientId?: number | null | undefined,
    patientName?: string | null | undefined,
    documentId?: number | null | undefined,
    documentName?: string | null | undefined,
    doctorId?: number | null | undefined,
    doctorName?: string | null | undefined,
    description?: string | null | undefined,
}

export interface IPatientFileFilter {
    firstName?: string | null | undefined,
    lastName?: string | null | undefined,
    mobile?: string | null | undefined,
}
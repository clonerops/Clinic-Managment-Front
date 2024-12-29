export interface IPatient {
    id?: number | null | undefined,
    firstName?: string | null | undefined,
    lastName?: string | null | undefined,
    nationalCode?: string | null | undefined,
    mobile?: string | null | undefined,
    whatsappNumber?: string | null | undefined,
    homeNumber?: string | null | undefined,
    birthDate?: string | null | undefined,
    job?: string | null | undefined,
    education?: string | null | undefined,
    reagent?: string | null | undefined,
    gender?: number | boolean | null | undefined,
    maritalStatus?: number | boolean | null | undefined,
    address?: string | null | undefined,
    description?: string | null | undefined,
}


export interface IPatientFilter {
    firstName?: string | null | undefined,
    lastName?: string | null | undefined,
    nationalCode?: string | null | undefined,
    mobile?: string | null | undefined,
}
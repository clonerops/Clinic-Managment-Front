import { http } from "../../../_cloner/utils/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/utils/queryStringUrl";
import { IReferral, IReferralFilter } from "./_models";

const CreateNewReferral = async (formData: IReferral) => {
    try {
        
        const { data } = await http.post("Referral", JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}


const FetchReferrals = async (filters: IReferralFilter) => {
    try {
        
        const { data } = await http.get(`${generateURLQueryParam("Referral", filters)}`)
        return data

    } catch (error: any) {
        return error.response
    }

}

const FetchReferral = async (id: number) => {
    try {
        
        const { data } = await http.get(`Referral/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}

const UpdateReferral = async (formData: IReferral) => {
    try {
        
        const { data } = await http.put(`Referral/${formData.id}`, JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}

const DeleteReferral = async (id: number) => {
    try {
        
        const { data } = await http.delete(`Referral/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}


export {
    CreateNewReferral,
    FetchReferrals,
    FetchReferral,
    UpdateReferral,
    DeleteReferral
}
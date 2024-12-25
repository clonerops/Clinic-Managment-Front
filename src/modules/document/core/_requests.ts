import { http } from "../../../_cloner/utils/axiosConfig";
import { IPatient } from "./_models";

const CreateNewPatient = async (formData: IPatient) => {
    try {
        
        const { data } = await http.post("Patient", JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}


const FetchPatiens = async () => {
    try {
        
        const { data } = await http.get("Patient")
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


export {
    CreateNewPatient,
    FetchPatiens,
    FetchPatient,
    UpdatePatient,
    DeletePatient
}
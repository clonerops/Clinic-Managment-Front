import { http } from "../../../_cloner/utils/axiosConfig";
import { IDoctor } from "./_models";

const CreateNewDoctor = async (formData: IDoctor) => {
    try {
        
        const { data } = await http.post("Doctor", JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}


const FetchDoctors = async () => {
    try {
        
        const { data } = await http.get("Doctor")
        return data

    } catch (error: any) {
        return error.response
    }

}

const FetchDoctor = async (id: number) => {
    try {
        
        const { data } = await http.get(`Doctor/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}

const UpdateDoctor = async (formData: IDoctor) => {
    try {
        
        const { data } = await http.put(`Doctor/${formData.id}`, JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}

const DeleteDoctor = async (id: number) => {
    try {
        
        const { data } = await http.delete(`Doctor/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}


export {
    CreateNewDoctor,
    FetchDoctors,
    FetchDoctor,
    UpdateDoctor,
    DeleteDoctor
}
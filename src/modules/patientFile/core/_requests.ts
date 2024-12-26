import { http } from "../../../_cloner/utils/axiosConfig";
import { IPatientFile } from "./_models";

const CreateNewPatientFile = async (formData: IPatientFile) => {
    try {
        
        const { data } = await http.post("PatientFile", JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}


const FetchPatientFiles = async () => {
    try {
        
        const { data } = await http.get("PatientFile")
        return data

    } catch (error: any) {
        return error.response
    }

}

const FetchPatientFile = async (id: number) => {
    try {
        
        const { data } = await http.get(`PatientFile/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}

const UpdatePatientFile = async (formData: IPatientFile) => {
    try {
        
        const { data } = await http.put(`PatientFile/${formData.id}`, JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}

const DeletePatientFile = async (id: number) => {
    try {
        
        const { data } = await http.delete(`PatientFile/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}


export {
    CreateNewPatientFile,
    FetchPatientFiles,
    FetchPatientFile,
    UpdatePatientFile,
    DeletePatientFile
}
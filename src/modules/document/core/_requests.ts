import { http } from "../../../_cloner/utils/axiosConfig";
import { IDocument } from "./_models";

const CreateNewDocument = async (formData: IDocument) => {
    try {
        
        const { data } = await http.post("Document", JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}


const FetchDocuments = async () => {
    try {
        
        const { data } = await http.get("Document")
        return data

    } catch (error: any) {
        return error.response
    }

}

const FetchDocument = async (id: number) => {
    try {
        
        const { data } = await http.get(`Document/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}

const UpdateDocument = async (formData: IDocument) => {
    try {
        
        const { data } = await http.put(`Document/${formData.id}`, JSON.stringify(formData))
        return data

    } catch (error: any) {
        return error.response
    }
}

const DeleteDocument = async (id: number) => {
    try {
        
        const { data } = await http.delete(`Document/${id}`)
        return data

    } catch (error: any) {
        return error.response
    }
}


export {
    CreateNewDocument,
    FetchDocuments,
    FetchDocument,
    UpdateDocument,
    DeleteDocument
}
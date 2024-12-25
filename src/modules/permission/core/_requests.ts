import { http } from "../../../_cloner/utils/axiosConfig"
import { IPermission } from "./_models"

const getPermissions = async () => {
    try {
        const {data} = await http.get("/Permission")
        return data
    } catch (error: any) {
        return error.response
    }
}

const getPermission = async (id: string) => {
    try {
        const {data} = await http.get(`/Permission/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const createPermission = async (formData: IPermission) => {
    try {
        const {data} = await http.post('/Permission', JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const editPermission = async (formData: IPermission) => {
    try {
        const {data} = await http.put(`/Permission/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
    
}

const deletePermission = async (id: string) => {
    try {
        const {data} = await http.delete(`/Permission/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}


const getPermissionsByMenu = async () => {
    try {
        const { data } = await http.get("/Permission/GetAllPermissionsByMenu");
        return data;
    } catch (error: any) {
        return error.response
    }

}

export {
    getPermissions,
    getPermission,
    createPermission,
    editPermission,
    getPermissionsByMenu,
    deletePermission
}
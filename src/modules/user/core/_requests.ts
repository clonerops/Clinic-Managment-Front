import { http } from "../../../_cloner/utils/axiosConfig"
import { IUser } from "./_models"

const getUsers = async () => {
    try {
        const {data} = await http.get("/ApplicationUser")
        return data
    } catch (error: any) {
        return error.response
    }
}

const getUser = async (id: string) => {
    try {
        const {data} = await http.get(`/ApplicationUser/${id}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

const createUser = async (formData: IUser) => {
    try {
        const {data} = await http.post('/ApplicationUser', JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const editUser = async (formData: IUser) => {
    try {
        const {data} = await http.put(`/ApplicationUser/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }

}


export {
    getUsers,
    getUser,
    createUser,
    editUser
}
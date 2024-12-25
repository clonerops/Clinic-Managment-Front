import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IUser } from "./_models"

const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => api.getUsers()
    })
}

const useGetUser = () => {
    return useMutation({
        mutationFn: (id: string) => api.getUser(id)
    })
}

const useCreateUser = () => {
    return useMutation({
        mutationFn: (formData: IUser) => api.createUser(formData)
    })
}

const useEditUser = () => {
    return useMutation({
        mutationFn: (formData: IUser) => api.editUser(formData)
    })
}

export {
    useGetUsers,
    useGetUser,
    useCreateUser,
    useEditUser
}
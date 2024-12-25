import { useMutation, useQuery } from "@tanstack/react-query"
import * as api from './_requests'
import { IPermission } from "./_models"

const useGetPermissions = () => {
    return useQuery({
        queryKey: ["permissions"],
        queryFn: () => api.getPermissions()
    })
}

const useGetPermission = () => {
    return useMutation({
        mutationFn: (id: string) => api.getPermission(id)
    })
}

const useCreatePermission = () => {
    return useMutation({
        mutationFn: (formData: IPermission) => api.createPermission(formData)
    })
}

const useEditPermission = () => {
    return useMutation({
        mutationFn: (formData: IPermission) => api.editPermission(formData)
    })
}

const useDeletePermission = () => {
    return useMutation({
        mutationFn: (id: string) => api.deletePermission(id)
    })
}


const useGetPermissionsByMenu = () => {
    return useQuery({
        queryKey: ["permissions-by-menu"],
        queryFn: () => api.getPermissionsByMenu()
    })
}


export {
    useGetPermissions,
    useGetPermission,
    useCreatePermission,
    useEditPermission,
    useGetPermissionsByMenu,
    useDeletePermission
}
import { useMutation, useQuery } from "@tanstack/react-query";
import { IRoleMenu } from "./_models";
import * as api from './_requests'


const useGetRoleMenus = () => {
    return useQuery({
        queryKey: ['roleMenus'],
        queryFn: () => api.getRoleMenus(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useGetRoleMenusById = (roleId: string) => {
    return useQuery({
        queryKey: ["roleMenusById", roleId],
        queryFn: () => api.getRoleMenusById(roleId),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false

    });
};

const usePostRoleMenus = () => {
    return useMutation({
        mutationFn: (formData: IRoleMenu) => api.postRoleMenus(formData)
    });
};

const useGetApplicationMenus = () => {
    return useQuery({
        queryKey: ["roleAppMenu"],
        queryFn: () => api.getApplicationMenus(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};


const useGetAllApplicationMenus = () => {
    return useQuery({
        queryKey: ["roleAllAppMenu"],
        queryFn: () => api.getAllApplicationMenus(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};

const useDeleteRoleMenu = () => {
    return useMutation({
        mutationFn: (id: string) => api.deleteRoleMenu(id)
    });
};

export {
    useGetRoleMenus,
    useGetRoleMenusById,
    usePostRoleMenus,
    useGetApplicationMenus,
    useDeleteRoleMenu,
    useGetAllApplicationMenus
}
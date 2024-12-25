import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from './_requests'
import { IGroup } from "./_models";

const useGetApplicationRoles = () => {
    return useQuery({
        queryKey: ['groups'],
        queryFn: () => api.getApplicationRoles(),
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false
    });
};

const usePostApplicationRoles = () => {
    return useMutation({
        mutationFn: (formData: IGroup) => api.postApplicationRoles(formData)
    });
};
const usePutApplicationRoles = () => {
    return useMutation({
        mutationFn: (formData: IGroup) => api.putApplicationRoles(formData)
    });
};
const useGetApplicationRole = () => {
    return useMutation({
        mutationFn: (id: string) => api.getApplicationRole(id)
    });
};

const useDeleteApplicationRoles = () => {
    return useMutation({
        mutationFn: (id: string) => api.deleteApplicationRoles(id)
    });
};

export {
    useGetApplicationRoles,
    useGetApplicationRole,
    usePostApplicationRoles,
    useDeleteApplicationRoles,
    usePutApplicationRoles
}
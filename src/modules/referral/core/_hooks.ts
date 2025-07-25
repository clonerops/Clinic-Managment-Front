import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'
import { IReferral, IReferralFilter } from "./_models";

const useCreateNewReferral = () => useMutation({
    mutationFn: (formData: IReferral) => api.CreateNewReferral(formData),
})
const useFetchReferrals = () => useMutation({
    mutationFn: (filters: IReferralFilter) => api.FetchReferrals(filters),
})
const useFetchReferral = () => useMutation({
    mutationFn: (id: number) => api.FetchReferral(id),
})
const useUpdateReferral = () => useMutation({
    mutationFn: (formData: IReferral) => api.UpdateReferral(formData),
})
const useDeleteReferral = () => useMutation({
    mutationFn: (id: number) => api.DeleteReferral(id),
})



export {
    useCreateNewReferral,
    useFetchReferrals,
    useFetchReferral,
    useUpdateReferral,
    useDeleteReferral
}
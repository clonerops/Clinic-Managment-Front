import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'
import { IDoctor, IDoctorFilter } from "./_models";

const useCreateNewDoctor = () => useMutation({
    mutationFn: (formData: IDoctor) => api.CreateNewDoctor(formData),
})
const useFetchDoctors = () => useMutation({
    mutationFn: (filters: IDoctorFilter) => api.FetchDoctors(filters),
})
const useFetchDoctor = () => useMutation({
    mutationFn: (id: number) => api.FetchDoctor(id),
})
const useUpdateDoctor = () => useMutation({
    mutationFn: (formData: IDoctor) => api.UpdateDoctor(formData),
})
const useDeleteDoctor = () => useMutation({
    mutationFn: (id: number) => api.DeleteDoctor(id),
})



export {
    useCreateNewDoctor,
    useFetchDoctors,
    useFetchDoctor,
    useUpdateDoctor,
    useDeleteDoctor
}
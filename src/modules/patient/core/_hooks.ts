import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'
import { IPatient } from "./_models";

const useCreateNewPatient = () => useMutation({
    mutationFn: (formData: IPatient) => api.CreateNewPatient(formData),
})
const useFetchPatiens = () => useMutation({
    mutationFn: () => api.FetchPatiens(),
})
const useFetchPatient = () => useMutation({
    mutationFn: (id: number) => api.FetchPatient(id),
})
const useUpdatePatient = () => useMutation({
    mutationFn: (formData: IPatient) => api.UpdatePatient(formData),
})
const useDeletePatient = () => useMutation({
    mutationFn: (id: number) => api.DeletePatient(id),
})



export {
    useCreateNewPatient,
    useFetchPatiens,
    useFetchPatient,
    useUpdatePatient,
    useDeletePatient
}
import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'
import { IPatientFile, IPatientFileFilter } from "./_models";

const useCreateNewPatientFile = () => useMutation({
    mutationFn: (formData: IPatientFile) => api.CreateNewPatientFile(formData),
})
const useFetchPatientFiles = () => useMutation({
    mutationFn: (filters: IPatientFileFilter) => api.FetchPatientFiles(filters),
})
const useFetchPatientFile = () => useMutation({
    mutationFn: (id: number) => api.FetchPatientFile(id),
})
const useUpdatePatientFile = () => useMutation({
    mutationFn: (formData: IPatientFile) => api.UpdatePatientFile(formData),
})
const useDeletePatientFile = () => useMutation({
    mutationFn: (id: number) => api.DeletePatientFile(id),
})



export {
    useCreateNewPatientFile,
    useFetchPatientFiles,
    useFetchPatientFile,
    useUpdatePatientFile,
    useDeletePatientFile
}
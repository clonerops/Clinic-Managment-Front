import { useMutation } from "@tanstack/react-query";
import * as api from './_requests'
import { IDocument } from "./_models";

const useCreateNewDocument = () => useMutation({
    mutationFn: (formData: IDocument) => api.CreateNewDocument(formData),
})
const useFetchDocuments = () => useMutation({
    mutationFn: () => api.FetchDocuments(),
})
const useFetchDocument = () => useMutation({
    mutationFn: (id: number) => api.FetchDocument(id),
})
const useUpdateDocument = () => useMutation({
    mutationFn: (formData: IDocument) => api.UpdateDocument(formData),
})
const useDeleteDocument = () => useMutation({
    mutationFn: (id: number) => api.DeleteDocument(id),
})



export {
    useCreateNewDocument,
    useFetchDocuments,
    useFetchDocument,
    useUpdateDocument,
    useDeleteDocument
}
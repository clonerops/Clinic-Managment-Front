import { useMutation, useQuery } from "@tanstack/react-query"
import { ILogin } from "./_models"
import * as api from './_requests'

const useLoginUser = () => useMutation({
    mutationFn: (formData: ILogin) => api.loginUser(formData),
})

const useGetCaptcha = () => {
    return useQuery({
        queryKey: ["captcha"],
        queryFn: () => api.getCaptcha()
        
    })
}

export {
    useLoginUser,
    useGetCaptcha
}
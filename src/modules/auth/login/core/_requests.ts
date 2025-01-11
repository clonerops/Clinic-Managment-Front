import axios from "axios"
import { http } from "../../../../_cloner/utils/axiosConfig"
import { ILogin } from "./_models"

const loginUser = async (formData: ILogin) => {
    try {
        const {data} = await axios.post('https://behtanroo.ir/api/Account/Login', JSON.stringify(formData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error: any) {
        return error.response
    }
}

const getCaptcha = async () => {
    try {
        const { data } = await http.get('/Captcha')
        return data    
    } catch (error: any) {
        return error.response
    }
}


export {
    loginUser,
    getCaptcha
}
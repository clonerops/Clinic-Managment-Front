import axios from "axios";
import Cookies from "js-cookie";

export const http = axios.create({
    baseURL: "https://behtanroo.ir/api",
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${Cookies.get("token")}`,
    }
})
export const httpFormData = axios.create({
    baseURL: "https://behtanroo.ir/",
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${Cookies.get("token")}`,
    }
})
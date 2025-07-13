import axios from "axios";

export const http = axios.create({
    // baseURL: "https://behtanroo.ir/api",
    baseURL: "http://localhost:7142/api",
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${Cookies.get("token")}`,
    }
})
export const httpFormData = axios.create({
    // baseURL: "https://behtanroo.ir/",
    baseURL: "http://localhost:7142/",
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${Cookies.get("token")}`,
    }
})
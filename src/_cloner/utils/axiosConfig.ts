import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:7142/api/",
    headers: {
        "Content-Type": "application/json",
        // "Authorization": 'Bearer '+Cookies.get('token')
    }
})
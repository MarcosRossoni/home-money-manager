import axios from "axios";
import verificaToken from "./verifica.token";

let TOKEN = JSON.parse(localStorage.getItem("user_token"));

const pathBackend = axios.create({
    baseURL: "http://localhost:9000",
    // baseURL: "https://home-money-manager.up.railway.app",
})

pathBackend.interceptors.request.use(async config => {
        if (TOKEN) {
            config.headers.Authorization = `Bearer ${TOKEN.acces_token}`;
            config.headers["Content-Type"] = "application/json";
            return config;
        }

        config.auth = {password: "user", username: "user"}

        return config;
    }, error => {
        return Promise.reject(error);
    }
)

pathBackend.interceptors.response.use(async response => {
    return response;

}, error => {
    let status = error.response.status;
    if (status === 401) {
        console.log(TOKEN)
        if (TOKEN) {
            verificaToken.deleteToken()
            return
        }
        console.log("precisa do refresh token")
    }
    return error.response;
})

export default pathBackend
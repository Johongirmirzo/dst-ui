import ENDPOINTS from "../../config/endpoints";
import {baseURL} from "../index";

interface UserFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface LoginFormData {
    email: string;
    password: string;
}

const registerUser =  async (userData: UserFormData)=>{
    return await baseURL.post(ENDPOINTS.REGISTER_USER, userData);
}
const loginUser = async (loginData: LoginFormData)=>{
    return await baseURL.post(ENDPOINTS.LOGIN_USER, loginData)
}
const getUserToken = async (config: {withCredentials: true})=>{
    return await baseURL.get(ENDPOINTS.USER_TOKEN_URL, config);
}
const logoutUser = async ()=>{
    return await baseURL.get(ENDPOINTS.LOGOUT_USER);
}

export {
    registerUser,
    loginUser,
    getUserToken,
    logoutUser
}
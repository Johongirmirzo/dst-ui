import axios from "axios"

export const baseURL = axios.create({
    baseURL: 'https://daily-sleep-trackker.herokuapp.com',
    // baseURL: "http://localhost:8800",
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    withCredentials: true
});

baseURL.interceptors.request.use((config)=>{
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log(user)
    if(user){
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${user.accessToken}`,
            RefreshToken: `Bearer ${user.refreshToken}`
        }
    }
    return config
}, err => {
    console.log(err);
})

baseURL.interceptors.response.use(response =>{
    console.log("Server Response" ,response);
    return response
},
    error =>{
        console.log("Server Response", error);
        if(error.response.data?.isLoginRequired){
            localStorage.removeItem("user")
            window.location.href="/login"
        }
})
 
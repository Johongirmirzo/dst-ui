const ENDPOINTS = {
    GET_ALL_SLEEP_ENTRIES: "/api/sleepEntry/getAllSleepEntries",
    GET_SLEEP_ENTRY: "/api/sleepEntry/getSleepEntry",
    ADD_SLEEP_ENTRY: "/api/sleepEntry/addSleepEntry",
    EDIT_SLEEP_ENTRY: "/api/sleepEntry/edit",
    DELETE_SLEEP_ENTRY: "/api/sleepEntry/delete",
    REGISTER_USER: "/auth/register",
    LOGIN_USER: "/auth/login",
    LOGOUT_USER: "/auth/logout",
    USER_TOKEN_URL: "/auth/login/success",
    FACEBOOK_AUTH_URL: "http://localhost:5500/auth/facebook",
    GOOGLE_AUTH_URL: "http://localhost:5500/auth/google",
    LINKEDIN_AUTH_URL: "http://localhost:5500/auth/linkedin"
}

export default ENDPOINTS
import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const AUTH_URL = `${BACKEND_URL}/users/`;

const register = async (userData) => {
    const response = await axios.post(AUTH_URL + "register", userData, { withCredentials: true });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(AUTH_URL + "login", userData, { withCredentials: true });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

const logOut = async () => {
    const response = await axios.get(AUTH_URL + "logout", { withCredentials: true });
    localStorage.removeItem("token");
    return response.data.message;
};

const getLogInStatus = async () => {
    const response = await axios.get(AUTH_URL + "loggedIn", { withCredentials: true });
    return response.data;
};

const getuserProfile = async () => {
    const response = await axios.get(AUTH_URL + "getuser", { withCredentials: true });
    return response.data;
};

const loginUserAsSeller = async (userData) => {
    const response = await axios.post(`${AUTH_URL}seller`, userData, {
        withCredentials: true
    });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

const getUserIncome = async () => {
    const response = await axios.get(AUTH_URL + "sell-amount", { withCredentials: true });
    return response.data;
};

const getIncome = async () => {
    const response = await axios.get(AUTH_URL + "estimate-income", { withCredentials: true });
    return response.data;
};
const getAllUser = async () => {
    const response = await axios.get(AUTH_URL + "users", { withCredentials: true });
    return response.data;
};

const authService = {
    register,
    login,
    logOut,
    getLogInStatus,
    getuserProfile,
    loginUserAsSeller,
    getUserIncome,
    getIncome,
    getAllUser,
};

export default authService;

import axios from "axios";
import { API_END_POINT, API_LOGIN_URL, API_PROFILE_URL, API_LOGOUT_URL } from '../utils/constants';

const getUserProfile = async () => {
    return await axios.get(`${API_END_POINT}/${API_PROFILE_URL}`);
}

const login = async (formData) => {
    // await axios.get(`${API_END_POINT}/sanctum/csrf-cookie`).then(response => {
        
    // });
    return await axios.post(`${API_END_POINT}/${API_LOGIN_URL}`, formData);
}

const logout = async () => {
    return await axios.post(`${API_END_POINT}/${API_LOGOUT_URL}`);
}

const userService = {
    getUserProfile,
    login,
    logout
}

export default userService;
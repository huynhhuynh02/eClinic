import axios from "axios";
import { 
    API_END_POINT, 
    API_LOGIN, 
    API_LOGOUT,
    API_PROFILE
} from '../utils/constants';

const login = async (formData) => {
    try {
        return await axios.post(`${API_END_POINT}/${API_LOGIN}`, formData);
        
    } catch (error) {
        console.error(error);
    }
}

const logout = async () => {
    try {
        return await axios.post(`${API_END_POINT}/${API_LOGOUT}`);
        
    } catch (error) {
        console.error(error);
    }
}

const getProfile = async () => {
    try {
        return await axios.get(`${API_END_POINT}/${API_PROFILE}`);
        
    } catch (error) {
        console.error(error);
    }
}

const authService = {
    login,
    logout,
    getProfile
}

export default authService;

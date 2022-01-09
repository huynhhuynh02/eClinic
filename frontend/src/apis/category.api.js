import axios from "axios";
import { API_CATEGORY_URL } from '../utils/constants';

export const getCategory = async (id) => {
    try {
        return await axios.get(`${API_CATEGORY_URL}/${id}`);
        
    } catch (error) {
        console.error(error);
    }
}

export const getAllCategory = async () => {
    try {
        return await axios.get(`${API_CATEGORY_URL}`);
        
    } catch (error) {
        console.error(error);
    }
}
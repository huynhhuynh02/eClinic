import axios from "axios";
import { API_MEDICINE_URL } from '../utils/constants';

export const getMedicine = async (id) => {
    try {
        return await axios.get(`${API_MEDICINE_URL}/${id}/edit`);
        
    } catch (error) {
        console.error(error);
    }
}

export const getAllMedicines = async () => {
    try {
        return await axios.get(`${API_MEDICINE_URL}`);
        
    } catch (error) {
        console.error(error);
    }
}
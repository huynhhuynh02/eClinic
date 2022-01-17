import axios from "axios";
import { API_END_POINT, API_PATIENT_URL } from '../utils/constants';

export const getPaient = async (id) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_PATIENT_URL}/${id}/edit`);
        
    } catch (error) {
        console.error(error);
    }
}
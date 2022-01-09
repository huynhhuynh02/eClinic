import axios from "axios";
import { API_PRESCRIPTION_URL } from '../utils/constants';

export const getPrescription = async (id) => {
    try {
        return await axios.get(`${API_PRESCRIPTION_URL}/${id}/edit`);
        
    } catch (error) {
        console.error(error);
    }
}

export const getAllPrescription = async () => {
    try {
        return await axios.get(`${API_PRESCRIPTION_URL}`);
        
    } catch (error) {
        console.error(error);
    }
}

export const addPrescription = async (data) => {
    try {
        return await axios.post(`${API_PRESCRIPTION_URL}`,data);
    } catch (error) {
        console.error(error);
    }
}
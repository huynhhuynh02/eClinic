import axios from "axios";
import {API_END_POINT, API_MEDICINE_URL } from '../utils/constants';

export const getMedicine = async (id) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_MEDICINE_URL}/${id}/edit`);
        
    } catch (error) {
        console.error(error);
    }
}

export const getAllMedicines = async () => {
    try {
        return await axios.get(`${API_END_POINT}/${API_MEDICINE_URL}`);
        
    } catch (error) {
        console.error(error);
    }
}

export const addMedicines = async (formData) => {
    try {
        return await axios.post(`${API_END_POINT}/${API_MEDICINE_URL}`);
        
    } catch (error) {
        console.error(error);
    }
}

export const updateMedicines = async (id, formData) => {
    try {
        return await axios.put(`${API_END_POINT}/${API_MEDICINE_URL}/${id}`, formData);
        
    } catch (error) {
        console.error(error);
    }
}

export const deleteMedicines = async (id) => {
    try {
        return await axios.delete(`${API_END_POINT}/${API_MEDICINE_URL}/${id}`);
        
    } catch (error) {
        console.error(error);
    }
}
import axios from "axios";
// import {API_END_POINT } from '../utils/constants'; Sua sau
const API_END_POINT = 'http://localhost:8000';
const API_CLINIC_URL = 'api/clinics';

export const getClinic = async (id) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_CLINIC_URL}/show`);
        
    } catch (error) {
        console.error(error);
    }
}

// export const getAllClinics = async () => {
    // try {
        // return await axios.get(`${API_END_POINT}/${API_CLINIC_URL}`);
        
    // } catch (error) {
        // console.error(error);
    // }
// }

// export const addClinics = async (formData) => {
    // try {
        // return await axios.post(`${API_END_POINT}/${API_CLINIC_URL}`);
        
    // } catch (error) {
        // console.error(error);
    // }
// }

export const updateClinic = async (formData) => {
    try {
        return await axios.post(`${API_END_POINT}/${API_CLINIC_URL}/`, formData);
        
    } catch (error) {
        console.error(error);
    }
}

// export const deleteClinics = async (id) => {
    // try {
        // return await axios.delete(`${API_END_POINT}/${API_CLINIC_URL}/${id}`);
        
    // } catch (error) {
        // console.error(error);
    // }
// }
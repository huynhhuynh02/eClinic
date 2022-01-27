import axios from "axios";
import { API_END_POINT, API_PRESCRIPTION_URL } from '../utils/constants';

export const getPrescription = async (id) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_PRESCRIPTION_URL}/${id}/edit`);

    } catch (error) {
        console.error(error);
    }
}

export const getAllPrescription = async (perPage = 10, pagerIndex = 1) => {
    const params = {
        per_page: perPage,
        page: pagerIndex,
    }
    try {
        return await axios.get(`${API_END_POINT}/${API_PRESCRIPTION_URL}`,{ params: params });

    } catch (error) {
        console.error(error);
    }
}

export const addPrescription = async (data) => {
    try {
        return await axios.post(`${API_END_POINT}/${API_PRESCRIPTION_URL}`, data);
    } catch (error) {
        console.error(error);
    }
}
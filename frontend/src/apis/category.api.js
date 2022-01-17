import axios from "axios";
import { API_END_POINT,API_CATEGORY_URL } from '../utils/constants';

export const getCategory = async (id) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_CATEGORY_URL}/${id}`);
        
    } catch (error) {
        console.error(error);
    }
}

export const getAllCategory = async () => {
    try {
        return await axios.get(`${API_END_POINT}/${API_CATEGORY_URL}`);
        
    } catch (error) {
        console.error(error);
    }
}

export const addCategory = async (formData) => {
    try {
        return await axios.post(`${API_END_POINT}/${API_CATEGORY_URL}`, formData);
        
    } catch (error) {
        console.error(error);
    }
}

export const updateCategory = async (id, formData) => {
    try {
        return await axios.put(`${API_END_POINT}/${API_CATEGORY_URL}/${id}`, formData);
        
    } catch (error) {
        console.error(error);
    }
}

export const deleteCategory = async (id) => {
    try {
        return await axios.delete(`${API_END_POINT}/${API_CATEGORY_URL}/${id}`);
        
    } catch (error) {
        console.error(error);
    }
}
import axios from "axios";
import { API_CATEGORY_URL, API_END_POINT } from '../utils/constants';

export const getCategory = async (id) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_CATEGORY_URL}/${id}`);
        
    } catch (error) {
        console.error(error);
    }
}

export const getAllCategory = async (perPage = 10, pagerIndex = 1) => {
    const params = {
        per_page: perPage,
        page: pagerIndex,
    }
    try {
        return await axios.get(`${API_END_POINT}/${API_CATEGORY_URL}`, { params: params }).then(response => {
            console.log(response.data)
            return response
        });
        
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
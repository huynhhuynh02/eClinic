import axios from "axios";
import { API_CITY, API_DISTRICT, API_END_POINT, API_WARD } from '../utils/constants';

export const getCity = async () => {
    try {
        return await axios.get(`${API_END_POINT}/${API_CITY}`);
    } catch (error) {
        console.error(error);
    }
}

export const getDisTrict = async (city_code) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_DISTRICT}`, {params: {city_code: city_code}});
    } catch (error) {
        console.error(error);
    }
}

export const getWard = async (district_code) => {
    try {
        return await axios.get(`${API_END_POINT}/${API_WARD}`,{params: {district_code: district_code}});
    } catch (error) {
        console.error(error);
    }
}
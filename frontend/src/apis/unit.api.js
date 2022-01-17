import axios from "axios";
import {API_END_POINT, API_UNIT_URL} from '../utils/constants';

export const getAllUnit = async () => {
    try {
        return await axios.get(`${API_END_POINT}/${API_UNIT_URL}`);
        
    } catch (error) {
        console.error(error);
    }
}
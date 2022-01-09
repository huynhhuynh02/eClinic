import axios from "axios";
import { API_PROVINCE, API_DISTRICT, API_WARD , TOKEN_GHN} from '../utils/constants';

export const getProvince = async () => {
    try {
        return await axios.get(`${API_PROVINCE}`, { 'headers': {'Token':TOKEN_GHN , 'Content-Type': 'application/json'}});
        
    } catch (error) {
        console.error(error);
    }
}

export const getDisTrict = async (province_id) => {
    try {
        return await axios.get(`${API_DISTRICT}`,{ 'headers': {'Token':TOKEN_GHN , 'Content-Type': 'application/json'}});
        
    } catch (error) {
        console.error(error);
    }
}
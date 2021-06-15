/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = '/api/company';

const getAllCompanies = async () => {
    try {
        const res: any = await axios.get(baseURL + '/');
        return res;    
    } catch (error) {
        return error;
    }
}

export default {
    getAllCompanies,
}
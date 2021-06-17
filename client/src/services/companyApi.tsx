/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Company } from '../models/companyModel';

const baseURL = '/api/company';

const getAllCompanies = async () => {
    try {
        const res: any = await axios.get<Company[]>(baseURL + '/');
        return res.data;    
    } catch (error: any) {
        return error;
    }
}

export default {
    getAllCompanies,
}
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

const getOneCompany = async (id: string) => {
    try {
        const res: any = await axios.get<Company[]>(`${baseURL}/${id}`);
        return res.data;
    } catch (error: any) {
        return error;
    }
}

export default {
    getAllCompanies,
    getOneCompany
}
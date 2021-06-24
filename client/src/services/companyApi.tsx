/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Company } from '../models/companyModel';

const baseURL = '/api/company';

const getAllCompanies = async () => {
    const res: any = await axios.get<Company[]>(baseURL + '/');
    return res.data;    
}

const getOneCompany = async (id: string) => {
    const res: any = await axios.get<Company[]>(`${baseURL}/${id}`);
    return res.data;
}

export default {
    getAllCompanies,
    getOneCompany
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Company, NewCompany } from '../models/companyModel';

const baseURL = '/api/company';

const getAllCompanies = async () => {
    const res: any = await axios.get<Company[]>(baseURL + '/');
    return res.data;    
}

const getOneCompany = async (id: string) => {
    const res: any = await axios.get<Company[]>(`${baseURL}/${id}`);
    return res.data;
}

const createCompany = async (newCompany: NewCompany) => {
    const res: any = await axios.post<NewCompany>(baseURL, newCompany);
    return res.data;
}

const deleteCompany = async (companyId: string) => {
    const res: any = await axios.delete(`${baseURL}/${companyId}`);
    return res.data;
}

export default {
    getAllCompanies,
    getOneCompany,
    createCompany,
    deleteCompany
}
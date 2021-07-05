/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { TopCompany } from '../models/companyModel';

const baseURL = '/api/public';

const getTopCompanies = async () => {
    const res: any = await axios.get<TopCompany[]>(baseURL + '/');
    return res.data;    
};

export default {
    getTopCompanies
};
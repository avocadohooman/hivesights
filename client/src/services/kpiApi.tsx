/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { KPI } from '../models/kpiModel';

const baseURL = '/api/kpi';

const getKeyKpi = async () => {
    const res: any = await axios.get<KPI>(baseURL + '/');
    return res.data;    
};

export default {
    getKeyKpi,
};
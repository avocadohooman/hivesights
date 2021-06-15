/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = '/api/auth'

export const fortyTwoUrl = async () => {
    const res: any = await axios.get(baseURL + '/42');
    return res.data;
}

const getToken = async (key: any) => {
    const res: any = await axios.get(baseURL + `/token/${key}`);
    console.log("RESPONSE", res.data.token);
    return res.data.token;
}

const setAuthToken = (token: any) => {
    if (token) {
        axios.defaults.headers.authorization = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.authorization;
    }
}

export default {
    fortyTwoUrl,
    getToken,
    setAuthToken,
}

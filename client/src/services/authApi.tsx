/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = 'http://localhost:3000/api/auth';

export const fortyTwoUrl = async () => {
    const res: any = await axios.get(baseURL + '/42');
    return res.data;
};

const getToken = async (key: any) => {
    const res: any = await axios.get(baseURL + `/token/${key}`);
    console.log("RESPONSE", res.data.token);
    return res.data.token;
}

export default {
    fortyTwoUrl,
    getToken
}

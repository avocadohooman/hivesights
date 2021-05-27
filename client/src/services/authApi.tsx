import axios from 'axios';

const baseURL = 'http://localhost:3000/api/auth';

export const fortyTwoUrl = async () => {
    const res: any = await axios.get(baseURL + '/42');
    return res.data;
};

export default fortyTwoUrl;

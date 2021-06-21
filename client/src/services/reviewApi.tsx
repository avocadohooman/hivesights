/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Review, NewReview, ReviewVoting} from '../models/reviewModel';

const baseURL = '/api/reviews';

const getAllReviews = async () => {
    try {
        const res: any = await axios.get<Review[]>(baseURL + '/');
        return res.data;    
    } catch (error: any) {
        return error;
    }
}

const getCompanyReviews = async (companyId: string) => {
    try {
        const res: any = await axios.get<Review[]>(`${baseURL}/company/${companyId}`);
        return res.data;
    } catch (error: any) {
        return error;
    }
}
const getOneReview = async (reviewId: string) => {
    try {
        const res: any = await axios.get<Review[]>(`${baseURL}/${reviewId}`);
        return res.data;
    } catch (error: any) {
        return error;
    }
}

export default {
    getAllReviews,
    getCompanyReviews,
    getOneReview
}

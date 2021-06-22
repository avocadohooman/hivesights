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

const updateReview = async (reviewId: string, updatedReview: NewReview) => {
    try {
        const res: any = await axios.put<NewReview>(`${baseURL}/${reviewId}`, updatedReview);
        return res.data;
    } catch (error: any) {
        return error;

    }
}

const createReview = async (companyId: string, newReview: NewReview) => {
    try {
        const res: any = await axios.post<NewReview>(`${baseURL}/${companyId}`, newReview);
    } catch (error: any) {
        return error;
    }
}

export default {
    getAllReviews,
    getCompanyReviews,
    getOneReview,
    updateReview,
    createReview
}

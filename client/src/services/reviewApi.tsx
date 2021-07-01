/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Review, NewReview, ReviewVoting} from '../models/reviewModel';
import { User } from '../models/userModel';

const baseURL = '/api/reviews';

const getAllReviews = async () => {
    const res: any = await axios.get<Review[]>(baseURL + '/');
    return res.data;    
};

const getCompanyReviews = async (companyId: string) => {
    const res: any = await axios.get<Review[]>(`${baseURL}/company/${companyId}`);
    return res.data;
};
const getOneReview = async (reviewId: string) => {
    const res: any = await axios.get<Review[]>(`${baseURL}/${reviewId}`);
    return res.data;
};

const updateReview = async (reviewId: string, updatedReview: NewReview) => {
    const res: any = await axios.put<NewReview>(`${baseURL}/${reviewId}`, updatedReview);
    return res.data;
};

const createReview = async (companyId: string, newReview: NewReview) => {
    const res: any = await axios.post<NewReview>(`${baseURL}/${companyId}`, newReview);
    return res.data;
};

const deleteReview = async (reviewId: string)  => {
    const res: any = await axios.delete<Review>(`${baseURL}/${reviewId}`);
    return res.data;
};

export default {
    getAllReviews,
    getCompanyReviews,
    getOneReview,
    updateReview,
    createReview,
    deleteReview
};

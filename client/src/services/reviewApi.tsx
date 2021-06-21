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

const getOneReview = async (id: string) => {
    try {
        const res: any = await axios.get<Review[]>(`${baseURL}/${id}`);
        return res.data;
    } catch (error: any) {
        return error;
    }
}

export default {
    getAllReviews,
    getOneReview
}

import { NewReview } from '../types/review';
import pool from '../db';
import reviewDBQueries from '../utils/reviewDBQueries';
import reviewServices from '../services/reviewServices';


const reviewTable = 'review_test';
const companyTable = 'company_test';
const reviewColumns = reviewDBQueries.reviewColumns;

let intialReviews: NewReview[] = [
    {
        companyId: "",
        userName: "gmolin",
        userPicture: "https://cdn.intra.42.fr/users/medium_gmolin.jpg",
        pros: "Great culture Nice perks Amazing office",
        cons: "Some projects are quite boring",
        overall: "A great place to grow as software developer",
        totalRating: 4,
        ratingCriteriaInterview: 4,
        ratingCriteriaOnboarding: 5,
        ratingCriteriaSupervision: 3,
        ratingCriteriaLearning: 5,
        ratingCriteriaCodingPractices: 4,
        ratingCriteriaPerks: 5,
        ratingCriteriaCulture: 5,
        salary: 4500,
        duration: 6,
        coverLetter: "none",
        cv: "none",
        upVotes: 0,
        upVoteUsers: [],
        downVotes: 0,
        downVoteUsers: []    
    },
    {
        companyId: "",
        userName: "hopham",
        userPicture: "https://cdn.intra.42.fr/users/medium_hopham.jpg",
        pros: "Great culture Nice perks Amazing office",
        cons: "Company language could be more English",
        overall: "A great place to grow as software developer",
        totalRating: 4,
        ratingCriteriaInterview: 4,
        ratingCriteriaOnboarding: 2,
        ratingCriteriaSupervision: 3,
        ratingCriteriaLearning: 5,
        ratingCriteriaCodingPractices: 4,
        ratingCriteriaPerks: 5,
        ratingCriteriaCulture: 5,
        salary: 4200,
        duration: 6,
        coverLetter: "none",
        cv: "none",
        upVotes: 0,
        upVoteUsers: [],
        downVotes: 0,
        downVoteUsers: [] 
    },
    {
        companyId: "",
        userName: "npimenof",
        userPicture: "https://cdn.intra.42.fr/users/medium_npimenof.jpg",
        pros: "Great culture Nice perks Amazing office",
        cons: "Some projects are quite boring",
        overall: "A great place to grow as software developer",
        totalRating: 3,
        ratingCriteriaInterview: 5,
        ratingCriteriaOnboarding: 5,
        ratingCriteriaSupervision: 5,
        ratingCriteriaLearning: 5,
        ratingCriteriaCodingPractices: 4,
        ratingCriteriaPerks: 5,
        ratingCriteriaCulture: 5,
        salary: 4000,
        duration: 6,
        coverLetter: "none",
        upVotes: 0,
        upVoteUsers: [],
        downVotes: 0,
        downVoteUsers: []   
    },
    {
        companyId: "",
        userName: "pandersi",
        userPicture: "https://cdn.intra.42.fr/users/medium_pandersi.jpg",
        pros: "Great culture Nice perks Amazing office",
        cons: "Some projects are quite boring",
        overall: "A great place to grow as software developer",
        totalRating: 4,
        ratingCriteriaInterview: 3,
        ratingCriteriaOnboarding: 5,
        ratingCriteriaSupervision: 4,
        ratingCriteriaLearning: 4,
        ratingCriteriaCodingPractices: 5,
        ratingCriteriaPerks: 5,
        ratingCriteriaCulture: 4,
        salary: 3800,
        duration: 6,
        coverLetter: "none",
        cv: "none",
        upVotes: 0,
        upVoteUsers: [],
        downVotes: 0,
        downVoteUsers: []      
    }
]

const populatingTable = async () => {
    await reviewServices.addReview(intialReviews[0], reviewTable, companyTable);
    await reviewServices.addReview(intialReviews[1], reviewTable, companyTable);
    await reviewServices.addReview(intialReviews[2], reviewTable, companyTable);
    await reviewServices.addReview(intialReviews[3], reviewTable, companyTable);
}

export default {
    intialReviews,
    populatingTable
}
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
        userPicture: "gmolin",
        pros: ["Great culture", "Nice perks", "Amazing office"],
        cons: ["Some projects are quite boring"],
        overall: "A great place to grow as software developer",
        totalRating: -1,
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
        cv: "none"    
    },
    {
        companyId: "",
        userName: "hoang",
        userPicture: "hoang",
        pros: ["Great culture"],
        cons: ["Company language could be more English"],
        overall: "A great place to grow as software developer",
        totalRating: -1,
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
        cv: "none"  
    },
    {
        companyId: "",
        userName: "niklas",
        userPicture: "niklas",
        pros: ["Great culture", "Nice perks", "Amazing office"],
        cons: ["Some projects are quite boring"],
        overall: "A great place to grow as software developer",
        totalRating: -1,
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
        cv: "none"     
    },
    {
        companyId: "",
        userName: "Pia",
        userPicture: "Pia",
        pros: ["Great culture", "Nice perks", "Amazing office"],
        cons: ["Some projects are quite boring"],
        overall: "A great place to grow as software developer",
        totalRating: -1,
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
        cv: "none"     
    }
]

const populatingTable = async () => {
    intialReviews[0].totalRating = reviewServices.calculateTotalScore(intialReviews[0]);
    await pool.query(`INSERT INTO ${reviewTable} 
    ${reviewColumns}
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING *`, 
    [
        intialReviews[0].companyId,
        intialReviews[0].userName,
        intialReviews[0].userPicture,
        intialReviews[0].pros,
        intialReviews[0].cons,
        intialReviews[0].overall,
        intialReviews[0].totalRating,
        intialReviews[0].ratingCriteriaInterview,
        intialReviews[0].ratingCriteriaOnboarding,
        intialReviews[0].ratingCriteriaSupervision,
        intialReviews[0].ratingCriteriaLearning,
        intialReviews[0].ratingCriteriaCodingPractices,
        intialReviews[0].ratingCriteriaPerks,
        intialReviews[0].ratingCriteriaCulture,
        intialReviews[0].salary,
        intialReviews[0].duration,
        intialReviews[0].coverLetter,
        intialReviews[0].cv
    ]);
    await reviewServices.updateAverageSalary(intialReviews[0].companyId, reviewTable, companyTable);
    await reviewServices.updateScores(intialReviews[0].companyId, reviewTable, companyTable);

    intialReviews[1].totalRating = reviewServices.calculateTotalScore(intialReviews[1]);
    await pool.query(`INSERT INTO ${reviewTable} 
    ${reviewColumns}
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING *`, 
    [
        intialReviews[1].companyId,
        intialReviews[1].userName,
        intialReviews[1].userPicture,
        intialReviews[1].pros,
        intialReviews[1].cons,
        intialReviews[1].overall,
        intialReviews[1].totalRating,
        intialReviews[1].ratingCriteriaInterview,
        intialReviews[1].ratingCriteriaOnboarding,
        intialReviews[1].ratingCriteriaSupervision,
        intialReviews[1].ratingCriteriaLearning,
        intialReviews[1].ratingCriteriaCodingPractices,
        intialReviews[1].ratingCriteriaPerks,
        intialReviews[1].ratingCriteriaCulture,
        intialReviews[1].salary,
        intialReviews[1].duration,
        intialReviews[1].coverLetter,
        intialReviews[1].cv
    ]);
    await reviewServices.updateAverageSalary(intialReviews[1].companyId, reviewTable, companyTable);
    await reviewServices.updateScores(intialReviews[1].companyId, reviewTable, companyTable);

    intialReviews[2].totalRating = reviewServices.calculateTotalScore(intialReviews[2]);
    await pool.query(`INSERT INTO ${reviewTable} 
    ${reviewColumns}
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING *`, 
    [
        intialReviews[2].companyId,
        intialReviews[2].userName,
        intialReviews[2].userPicture,
        intialReviews[2].pros,
        intialReviews[2].cons,
        intialReviews[2].overall,
        intialReviews[2].totalRating,
        intialReviews[2].ratingCriteriaInterview,
        intialReviews[2].ratingCriteriaOnboarding,
        intialReviews[2].ratingCriteriaSupervision,
        intialReviews[2].ratingCriteriaLearning,
        intialReviews[2].ratingCriteriaCodingPractices,
        intialReviews[2].ratingCriteriaPerks,
        intialReviews[2].ratingCriteriaCulture,
        intialReviews[2].salary,
        intialReviews[2].duration,
        intialReviews[2].coverLetter,
        intialReviews[2].cv
    ]);
    await reviewServices.updateAverageSalary(intialReviews[2].companyId, reviewTable, companyTable);
    await reviewServices.updateScores(intialReviews[2].companyId, reviewTable, companyTable);

    intialReviews[3].totalRating = reviewServices.calculateTotalScore(intialReviews[3]);
    await pool.query(`INSERT INTO ${reviewTable} 
    ${reviewColumns}
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING *`, 
    [
        intialReviews[3].companyId,
        intialReviews[3].userName,
        intialReviews[3].userPicture,
        intialReviews[3].pros,
        intialReviews[3].cons,
        intialReviews[3].overall,
        intialReviews[3].totalRating,
        intialReviews[3].ratingCriteriaInterview,
        intialReviews[3].ratingCriteriaOnboarding,
        intialReviews[3].ratingCriteriaSupervision,
        intialReviews[3].ratingCriteriaLearning,
        intialReviews[3].ratingCriteriaCodingPractices,
        intialReviews[3].ratingCriteriaPerks,
        intialReviews[3].ratingCriteriaCulture,
        intialReviews[3].salary,
        intialReviews[3].duration,
        intialReviews[3].coverLetter,
        intialReviews[3].cv
    ]);
    await reviewServices.updateAverageSalary(intialReviews[3].companyId, reviewTable, companyTable);
    await reviewServices.updateScores(intialReviews[3].companyId, reviewTable, companyTable);
}

export default {
    intialReviews,
    populatingTable
}
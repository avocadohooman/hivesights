/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import pool from '../db';
import { NewReview } from '../types/review';
import reviewDBQueries from '../utils/reviewDBQueries';

// Getting review columns from reviewDBQueries helper file
const reviewColumns = reviewDBQueries.reviewColumns;
// Getting updateScore columens from reviewDBQueries helper file
const updateScoreColumns = reviewDBQueries.updateScoreColumns;

// Checking for a review duplicate
const checkDuplicate = async (newReview: NewReview, reviewTable: string) => {
    console.log('Check for duplicates');
    const userName = newReview.userName;
    const duplicate = await pool.query(`SELECT username FROM ${reviewTable} WHERE username = ($1)`, [userName]);
    if (duplicate.rowCount > 0) {
        console.log("Duplicate found: ", duplicate.rowCount > 0);
        return 0;  
    }
    console.log("Duplicate found: ", duplicate.rowCount > 0);
    return 1;
};

// Checking if review exists for PUT and GET:id calls
const checkIfExists = async (id: any, reviewTable: string) => {
    console.log("checkIfExists");
    const review = await pool.query(`SELECT id FROM ${reviewTable} WHERE id = ($1)`, [id])
        .catch((e:any) => {
            if (e) {
            console.log("ERROR");
            return 0;
            }
        });
    if (review.rowCount === 0) {
      return 0;
    }
    return 1;
};

// addReview function adds a new review to DB and updates average salary, total score, amount of review and average duration
const addReview = async (newReview: NewReview, reviewTable: string, companyTable: string) => {
    // newReview.totalRating = calculateTotalScore(newReview);
    await pool.query(`INSERT INTO ${reviewTable} 
    ${reviewColumns}
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
    RETURNING *`, 
    [
        newReview.companyId,
        newReview.userName,
        newReview.userPicture,
        newReview.pros,
        newReview.cons,
        newReview.overall,
        newReview.totalRating,
        newReview.ratingCriteriaInterview,
        newReview.ratingCriteriaOnboarding,
        newReview.ratingCriteriaSupervision,
        newReview.ratingCriteriaLearning,
        newReview.ratingCriteriaCodingPractices,
        newReview.ratingCriteriaPerks,
        newReview.ratingCriteriaCulture,
        newReview.salary,
        newReview.duration,
        newReview.coverLetter,
        newReview.cv,
        newReview.upVotes,
        newReview.upVoteUsers,
        newReview.downVotes,
        newReview.downVoteUsers,
    ]);
    await updateAverageSalary(newReview.companyId, reviewTable, companyTable);
    await updateScores(newReview.companyId, reviewTable, companyTable);
    await updateAmountOfReviews(newReview.companyId, reviewTable, companyTable);
    await updateAverageDuration(newReview.companyId, reviewTable, companyTable);
};

// updateScore calculates and updates average values for total score and subcategory scores of a company
const updateScores = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newTotalQuery = 'AVG (totalrating)::NUMERIC(10,2)';
    const averageInterviewQuery = 'AVG (ratingCriteriaInterview)::NUMERIC(10,2)';
    const averageOnboardingQuery = 'AVG (ratingCriteriaOnboarding)::NUMERIC(10,2)';
    const averageSupervisionQuery = 'AVG (ratingCriteriaSupervision)::NUMERIC(10,2)';
    const averageLearningQuery = 'AVG (ratingCriteriaLearning)::NUMERIC(10,2)';
    const averageCodingPracticesQuery = 'AVG (ratingCriteriaCodingPractices)::NUMERIC(10,2)';
    const averagePerksQuery = 'AVG (ratingCriteriaPerks)::NUMERIC(10,2)';
    const averageCultureQuery = 'AVG (ratingCriteriaCulture)::NUMERIC(10,2)';
    
    const newScores = await pool.query(`SELECT 
    ${newTotalQuery} as totalrating, 
    ${averageInterviewQuery} as interview,
    ${averageOnboardingQuery} as onboarding,
    ${averageSupervisionQuery} as supervision,
    ${averageLearningQuery} as learning,
    ${averageCodingPracticesQuery} as codingpractice,
    ${averagePerksQuery} as perks,
    ${averageCultureQuery} as culture
    FROM ${reviewTable} 
    WHERE companyid = ($1)`, [companyId]);
    
    const updatedRating = await pool.query(`UPDATE ${companyTable} 
    SET
        ${updateScoreColumns}
    WHERE
        id = ($9)`,
    [
        newScores.rows[0].totalrating,
        newScores.rows[0].interview,
        newScores.rows[0].onboarding,
        newScores.rows[0].supervision,
        newScores.rows[0].learning,
        newScores.rows[0].codingpractice,
        newScores.rows[0].perks,
        newScores.rows[0].culture,
        companyId
    ]).catch((e:any) => {
        if (e) {
          console.log("ERROR", e);
          throw new Error("ERROR: " + e.message);
        }
    });
    console.log(`Salary ${updatedRating.rows[0]} updated`);

};

// updateAverageSalary calculates and updates average salary for a company based on new review
const updateAverageSalary = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newAverageSalary = await pool.query(`SELECT AVG (salary)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    await pool.query(`UPDATE ${companyTable} 
    SET
    averagesalaries = ($1) 
    WHERE
    id = ($2)`,
    [
        newAverageSalary.rows[0].avg,
        companyId
    ]).catch((e:any) => {
        if (e) {
          console.log("ERROR", e);
          throw new Error("ERROR: " + e.message);
        }
    });
};

// updateAmountOfReviews calculates and updates amount of reviews for a company based on new review
const updateAmountOfReviews = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newAmount = await pool.query(`SELECT * FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    await pool.query(`UPDATE ${companyTable} 
    SET
    reviews = ($1) 
    WHERE
    id = ($2)`,
    [
        newAmount.rowCount,
        companyId
    ]).catch((e:any) => {
        if (e) {
          console.log("ERROR", e);
          throw new Error("ERROR: " + e.message);
        }
    });
};

// updateAverageDuration calculates and updates average internship duration for a company based on new review
const updateAverageDuration = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newDuration = await pool.query(`SELECT AVG (duration)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    await pool.query(`UPDATE ${companyTable} 
    SET
    averageduration = ($1) 
    WHERE
    id = ($2)`,
    [
        newDuration.rows[0].avg,
        companyId
    ]).catch((e:any) => {
        if (e) {
          console.log("ERROR", e);
          throw new Error("ERROR: " + e.message);
        }
    });
};

export default {
    updateScores,
    updateAverageSalary,
    updateAverageDuration,
    checkDuplicate,
    checkIfExists,
    addReview,
    updateAmountOfReviews
};

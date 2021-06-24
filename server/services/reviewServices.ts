import pool from '../db';
import { NewReview } from '../types/review';
import reviewDBQueries from '../utils/reviewDBQueries';

const reviewColumns = reviewDBQueries.reviewColumns;
const updateScoreColumns = reviewDBQueries.updateScoreColumns;

const checkDuplicate = async (newReview: NewReview, reviewTable: string) => {
    console.log('Check for duplicates');
    const userName = newReview.userName;
    const companyId = newReview.companyId;
    const duplicate = await pool.query(`SELECT companyid FROM ${reviewTable} WHERE username = ($1)`, [userName]);
    if (duplicate.rowCount > 0) {
        console.log("Duplicate found: ", duplicate.rowCount > 0);
        return 0;  
    }
    console.log("Duplicate found: ", duplicate.rowCount > 0);
    return 1;
};

const checkIfExists = async (id: any, reviewTable: string) => {
    console.log("checkIfExists");
    const review = 
      await pool.query(`SELECT id FROM ${reviewTable} WHERE id = ($1)`, [id])
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

// const updateTotalScore = async (companyId: string, reviewTable: string, companyTable: string) => {
//     const newTotalScore = await pool.query(`SELECT AVG (totalrating)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
//     const updatedRating = await pool.query(`UPDATE ${companyTable} 
//     SET
//     averageTotalScore = ($1) 
//     WHERE
//     id = ($2)`,
//     [
//         newTotalScore.rows[0].avg,
//         companyId
//     ]);
// };

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

const updateAverageSalary = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newAverageSalary = await pool.query(`SELECT AVG (salary)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const updatedSalary = await pool.query(`UPDATE ${companyTable} 
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

const updateAmountOfReviews = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newAmount = await pool.query(`SELECT * FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const updatedAmount = await pool.query(`UPDATE ${companyTable} 
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

const updateAverageDuration = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newDuration = await pool.query(`SELECT AVG (duration)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const updatedDuration = await pool.query(`UPDATE ${companyTable} 
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

// const calculateTotalScore = (newReview: NewReview) : number => {
//     const interview : number = newReview.ratingCriteriaInterview * 1;
//     const onboarding : number = newReview.ratingCriteriaOnboarding * 1.2;
//     const supervision : number = newReview.ratingCriteriaSupervision * 1.2;
//     const learning : number = newReview.ratingCriteriaLearning * 1;
//     const codingPractices : number = newReview.ratingCriteriaCodingPractices * 1;
//     const perks : number = newReview.ratingCriteriaPerks * 0.8;
//     const culture : number = newReview.ratingCriteriaPerks * 1;

//     const totalScore = (interview + onboarding + supervision + learning + codingPractices + perks + culture) / 7;
//     return totalScore;
// };

export default {
    updateScores,
    updateAverageSalary,
    updateAverageDuration,
    checkDuplicate,
    checkIfExists,
    addReview,
    updateAmountOfReviews
};

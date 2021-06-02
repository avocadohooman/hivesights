import pool from '../db';

const updateTotalScore = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newTotalScore = await pool.query(`SELECT AVG (totalrating)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    console.log('New Total Score', newTotalScore.rows[0].avg);
    const updatedRating = await pool.query(`UPDATE ${companyTable} 
    SET
    averageTotalScore = ($1) 
    WHERE
    id = ($2)`,
    [
        newTotalScore.rows[0].avg,
        companyId
    ]);
    console.log(`Company ${updatedRating.rows[0]} updated`);
}

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
    FROM review_test 
    WHERE companyid = ($1)`, [companyId]);
    console.log("New score", newScores.rows[0]);
    
    const updatedRating = await pool.query(`UPDATE ${companyTable} 
    SET
        averageTotalScore = ($1),
        averageinterviewscore = ($2),
        averageonboardingscore = ($3),
        averagesupervisionscore = ($4),
        averagelearningscore = ($5),
        averagecodingpracticesscore = ($6),
        averageperksscore = ($7),
        averageculturescore = ($8)
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
    ]);
}

const updateAverageSalary = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newAverageSalary = await pool.query(`SELECT AVG (salary)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    console.log('New Average Salary', newAverageSalary.rows[0].avg);
    const updatedRating = await pool.query(`UPDATE ${companyTable} 
    SET
    averagesalaries = ($1) 
    WHERE
    id = ($2)`,
    [
        newAverageSalary.rows[0].avg,
        companyId
    ]);
    console.log(`Company ${updatedRating.rows[0]} updated`);

}


export default {
    updateTotalScore,
    updateScores,
    updateAverageSalary
}
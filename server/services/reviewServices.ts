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
    const newTotalScore = await pool.query(`SELECT AVG (totalrating)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const averageInterviewScore = await pool.query(`SELECT AVG (ratingCriteriaInterview)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const averageOnboardingScore = await pool.query(`SELECT AVG (ratingCriteriaOnboarding)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const averageSupervisionScore = await pool.query(`SELECT AVG (ratingCriteriaSupervision)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const averageLearningScore = await pool.query(`SELECT AVG (ratingCriteriaLearning)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const averageCodingPracticesScore = await pool.query(`SELECT AVG (ratingCriteriaCodingPractices)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const averagePerksScore = await pool.query(`SELECT AVG (ratingCriteriaPerks)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    const averageCultureScore = await pool.query(`SELECT AVG (ratingCriteriaCulture)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
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
        newTotalScore.rows[0].avg,
        averageInterviewScore.rows[0].avg,
        averageOnboardingScore.rows[0].avg,
        averageSupervisionScore.rows[0].avg,
        averageLearningScore.rows[0].avg,
        averageCodingPracticesScore.rows[0].avg,
        averagePerksScore.rows[0].avg,
        averageCultureScore.rows[0].avg,
        companyId
    ]);
    console.log(`Updated ratings: ${updatedRating.rows[0]}`);
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
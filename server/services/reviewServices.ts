import pool from '../db';
import { CompanyTotalRating } from '../types/review';
import axios from 'axios';

const updateTotalScore = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newTotalScore = await pool.query(`SELECT AVG (totalrating)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    console.log('New Total Score', newTotalScore.rows[0].avg);
    const updatedRating = await pool.query(`UPDATE ${companyTable} 
    SET
    averagereviews = ($1) 
    WHERE
    id = ($2)`,
    [
        newTotalScore.rows[0].avg,
        companyId
    ]);
    console.log(`Company ${updatedRating.rows[0]} updated`);
}

const updateAverageSalary = async (companyId: string, reviewTable: string, companyTable: string) => {
    const newAverageSalary = await pool.query(`SELECT AVG (salary)::NUMERIC(10,2) FROM ${reviewTable} WHERE companyid = ($1)`, [companyId]);
    console.log('New Total Score', newAverageSalary.rows[0].avg);
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
    updateAverageSalary
}
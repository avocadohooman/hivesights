/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import { TopCompany, TopCompanyDB } from '../types/company';
import pool from '../db';

const publicDataRouter = express.Router();

// Setting table depending on NODE_ENV environment
const companyTable = process.env.NODE_ENV === 'production' ? 'company' : 'company_test';
console.log(`Using table for companyRoute: ${companyTable}`);

// Get Top 5 companies in DB
publicDataRouter.get('/', async (_req, res) => {
    try {
        const topCompaniesDB = await pool.query(`SELECT DISTINCT * FROM ${companyTable} ORDER BY averagetotalscore FETCH FIRST 5 ROWS only`);
        let topCompanies: TopCompany[] = [];
        topCompanies = topCompaniesDB.rows
            .filter((row: { averagetotalscore: number; }) => row.averagetotalscore)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .sort((function(a: any, b: any) {
                if (a.averagetotalscore && b.averagetotalscore) {
                    if (a.averagetotalscore === b.averagetotalscore) {
                        return a.reviews < b.reviews ? 1 : -1;
                    }
                    return a.averagetotalscore < b.averagetotalscore ? 1 : -1;
                }
            }))
            .map((company: TopCompanyDB) => ({
                averageTotalScore: company.averagetotalscore,
                companyName: company.companyname,
                companyURL: company.companyurl,
                averageSalaries: company.averagesalaries,
                reviews: company.reviews,
            }));
        return res.status(200).json(topCompanies);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});


export default publicDataRouter;
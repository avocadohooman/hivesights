import express from 'express';
import { Company, CompanyDB, CompanyRating, NewCompany } from '../types/company';
import pool from '../db';
import rateLimit from 'express-rate-limit';
import companyHelper from '../services/companyServices';
import companyParsing from '../services/companyParsing';
import companyServices from '../services/companyServices';
import middleware from './../middleware/middleware';

const companyRouter = express.Router();

// Setting table depending on NODE_ENV environment
const companyTable = process.env.NODE_ENV === 'production' ? 'company' : 'company_test';
console.log(`Using table: ${companyTable}`);

// Get all companies in DB
companyRouter.get('/', async (_req, res) => {
    try {
        const allCompaniesDB = await pool.query(`SELECT * FROM ${companyTable}`);
        let companies: Company[] = [];
        companies = allCompaniesDB.rows.map((row: CompanyDB) => ({
            id: row.id,
            companyName: row.companyname,
            companyDescription: row.companydescription,
            logoURL: row.logourl,
            companyURL: row.companyurl,
            companyLocation: row.companylocation,
            averageTotalScore: row.averagetotalscore,
            averageInterviewScore: row.averageinterviewscore,
            averageOnboardingScore: row.averageonboardingscore,
            averageSupervisionScore: row.averagesupervisionscore,
            averageLearningScore: row.averagelearningscore,
            averageCodingPracticesScore: row.averagecodingpracticesscore,
            averagePerksScore: row.averageperksscore,
            averageCultureScore: row.averageculturescore,
            averageSalaries: row.averagesalaries,
            averageDuration: row.averageduration,
            interviews: row.interviews,
            reviews: row.reviews,
        }));
        return res.status(200).json(companies);
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Get one particular company
companyRouter.get('/:id', async (req, res) => {
    const id: string = req.params.id;
    try {
        if (!await companyHelper.checkIfExists(id, companyTable)) {
            console.log("Company doesn't exist ERROR");
            return res.status(400).json({error: "Company doesn't exist."});
        }
        const companyDB = await pool.query(`SELECT * FROM ${companyTable} WHERE id = ($1)`, [id]);
        const company: Company = companyDB.rows.map((row: CompanyDB) => ({
            id: row.id,
            companyName: row.companyname,
            companyDescription: row.companydescription,
            logoURL: row.logourl,
            companyURL: row.companyurl,
            companyLocation: row.companylocation,
            averageTotalScore: row.averagetotalscore,
            averageInterviewScore: row.averageinterviewscore,
            averageOnboardingScore: row.averageonboardingscore,
            averageSupervisionScore: row.averagesupervisionscore,
            averageLearningScore: row.averagelearningscore,
            averageCodingPracticesScore: row.averagecodingpracticesscore,
            averagePerksScore: row.averageperksscore,
            averageCultureScore: row.averageculturescore,
            averageSalaries: row.averagesalaries,
            averageDuration: row.averageduration,
            interviews: row.interviews,
            reviews: row.reviews,
        }));
        return res.status(200).json(company);
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Update company in DB
companyRouter.put('/:id', async (req, res) => {
    const updatedCompanyId: string = req.params.id;
    try {
        if (!await companyHelper.checkIfExists(req.params.id, companyTable)) {
            console.log("Company doesn't exist ERROR");
            return res.status(400).json({error: "Company doesn't exist."});
        }
        const updatedCompanyBody: NewCompany = companyParsing.parsingCompany(req.body);
        const updatedCompany = await pool.query(`UPDATE ${companyTable} 
        SET
        companyName = ($1),
        companyDescription = ($2),
        logoURL = ($3),
        companyURL = ($4),
        companyLocation = ($5)
        WHERE
        id = ($6)`,
        [
            updatedCompanyBody.companyName,
            updatedCompanyBody.companyDescription,
            updatedCompanyBody.logoURL,
            updatedCompanyBody.companyURL,
            updatedCompanyBody.companyLocation,
            updatedCompanyId
        ]);
        console.log(`Company ${updatedCompany.rows[0]} updated`);
        return res.status(200).json(updatedCompany.rows);
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Update company rating, salary and duration in DB
companyRouter.put('/updateRating/:id', async (req, res) => {
    const updatedCompanyId: string = req.params.id;
    try {
        if (!await companyHelper.checkIfExists(req.params.id, companyTable)) {
            console.log("Company doesn't exist ERROR");
            return res.status(400).json({error: "Company doesn't exist."});
        }
        console.log('New Average', typeof(req.body.averageTotalScore));
        const updatedCompanyRating: CompanyRating = companyParsing.parsingCompanyRating(req.body);
        const updatedRating = await pool.query(`UPDATE ${companyTable} 
        SET
        averageTotalScore = ($1) 
        WHERE
        id = ($2)`,
        [
            updatedCompanyRating.averageTotalScore,
            updatedCompanyId
        ]);
        console.log(`Company ${updatedRating.rows[0]} updated`);
        return res.status(200).json(updatedRating.rows);
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

//setting limit for post requests
const postApiLimiter = rateLimit({
    max: 50,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many companies created from this IP, please try again after an hour' // message to send
});

// Create new company
companyRouter.post('/', middleware.userExtractorCompanyRights, async (req, res) => {
    try {
        const newCompany: NewCompany = companyParsing.parsingCompany(req.body);
        if (!await companyHelper.checkDuplicate(newCompany, companyTable)) {
            console.log("Duplicate ERROR");
            return res.status(400).json({error: 'Company already exists.'});
        }
        await companyServices.addCompany(newCompany, companyTable);
        return res.status(200).json(newCompany);
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Delete company
companyRouter.delete('/:id', middleware.userExtractorCompanyRights, async (req, res) => {
    const id: string = req.params.id;
    try {
        if (!await companyHelper.checkIfExists(id, companyTable)) {
            console.log("Company doesn't exist ERROR");
            return res.status(400).json({error: "Company doesn't exist."});
        }
        await pool.query(`DELETE FROM ${companyTable} WHERE id = ($1)`, [id]);
        console.log(`company deleted`);
        return res.status(200).json({message: "Company deleted"});
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

export default companyRouter;

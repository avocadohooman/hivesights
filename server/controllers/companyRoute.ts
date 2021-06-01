import express from 'express';
import { CompanyRating, NewCompany } from '../types/company';
import pool from '../db';
import rateLimit from 'express-rate-limit';
import companyHelper from '../services/companyServices';
import companyParsing from '../services/companyParsing';

const companyRouter = express.Router();

// Setting table depending on NODE_ENV environment
const companyTable = process.env.NODE_ENV === 'production' ? 'company' : 'company_test';
console.log(`Using table: ${companyTable}`);

// Get all companies in DB
companyRouter.get('/', async (_req, res) => {
    try {
        const allCompanies = await pool.query(`SELECT * FROM ${companyTable}`);
        return res.status(200).json(allCompanies.rows);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
})

// Get one particular company
companyRouter.get('/:id', async (req, res) => {
    const id: string = req.params.id;
    if (!await companyHelper.checkIfExists(id)) {
        console.log("Company doesn't exist ERROR");
        return res.status(400).json({error: "Company doesn't exist."});
    }
    try {
        const  company = await pool.query(`SELECT * FROM ${companyTable} WHERE id = ($1)`, [id]);
        console.log(`Company ${company.rows[0].companyname} fetched`);;
        return res.status(200).json(company.rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Update company in DB
companyRouter.put('/:id', async (req, res) => {
    if (!await companyHelper.checkIfExists(req.params.id)) {
        console.log("Company doesn't exist ERROR");
        return res.status(400).json({error: "Company doesn't exist."});
    }
    const updatedCompanyId: string = req.params.id;
    try {
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
        console.log(`Company ${updatedCompany.rows[0]} updated`);;
        return res.status(200).json(updatedCompany.rows);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Update company rating, salary and duration in DB
companyRouter.put('/updateRating/:id', async (req, res) => {
    if (!await companyHelper.checkIfExists(req.params.id)) {
        console.log("Company doesn't exist ERROR");
        return res.status(400).json({error: "Company doesn't exist."});
    }
    const updatedCompanyId: string = req.params.id;
    try {
        console.log('New Average', typeof(req.body.averageReviews));
        const updatedCompanyRating: CompanyRating = companyParsing.parsingCompanyRating(req.body);
        const updatedRating = await pool.query(`UPDATE ${companyTable} 
        SET
        averagereviews = ($1) 
        WHERE
        id = ($2)`,
        [
            updatedCompanyRating.averageReviews,
            updatedCompanyId
        ]);
        console.log(`Company ${updatedRating.rows[0]} updated`);;
        return res.status(200).json(updatedRating.rows);
    } catch (error) {
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
companyRouter.post('/', async (req, res) => {
    try {
        const newCompany: NewCompany = companyParsing.parsingCompany(req.body);
        if (!await companyHelper.checkDuplicate(newCompany)) {
            console.log("Duplicate ERROR");
            return res.status(400).json({error: 'Company already exists.'});
        }
        const addedCompany = await pool.query(`INSERT INTO ${companyTable} 
        (companyName, companyDescription, logoURL, companyURL, companyLocation)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *`, 
        [
            newCompany.companyName,
            newCompany.companyDescription,
            newCompany.logoURL,
            newCompany.companyURL,
            newCompany.companyLocation
        ]);
        return res.status(200).json(addedCompany.rows[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Delete company
companyRouter.delete('/:id', async (req, res) => {
    const id: string = req.params.id;
    if (!await companyHelper.checkIfExists(id)) {
        console.log("Company doesn't exist ERROR");
        return res.status(400).json({error: "Company doesn't exist."});
    }
    try {
        await pool.query(`DELETE FROM ${companyTable} WHERE id = ($1)`, [id]);
        console.log(`company deleted`);
        return res.status(200).json({message: "Company deleted"});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

export default companyRouter;

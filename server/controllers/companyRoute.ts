import express from 'express';
import { Company } from '../types/company';
import pool from '../db';
import rateLimit from 'express-rate-limit';

const companyRouter = express.Router();

// Setting table depending on NODE_ENV environment
const companyTable = process.env.NODE_ENV === 'production' ? 'company' : 'company_test';
console.log(`Using table: ${companyTable}`);

// Get all companies in DB
companyRouter.get('/', async (req, res) => {
    try {
        const allCompanies = await pool.query(`SELECT * FROM ${companyTable}`);
        console.log("Getting all companies", allCompanies.rows);
        return res.status(200).json(allCompanies.rows);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
})

// Get one particular company
companyRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        let company: Company;
        company = await pool.query(`SELECT * FROM ${companyTable} WHERE id = ($1)`, [id]);
        console.log(`Company ${company.companyName} fetched`);;
        return res.status(200).json(company);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
})

// Update company in DB
companyRouter.put('/:id', async (req, res) => {
    let updatedCompanyBody: Company = req.body;
    let updatedCompanyId = req.params;
    try {
        let updatedCompany: Company;
        updatedCompany = await pool.query(`UDPATE ${companyTable} 
        SET
        (companyName) = ($1),
        (companyDescription) = ($2),
        (logoURL) = ($3),
        (companyURL) = ($4),
        (companyLocation) = ($5)
        WHERE
        (id) = ($6)`,
        [
            updatedCompanyBody.companyName,
            updatedCompanyBody.logoURL,
            updatedCompanyBody.companyURL,
            updatedCompanyBody.companyLocation,
            updatedCompanyId
        ]);
        console.log(`Company ${updatedCompany.companyName} updated`);;
        return res.status(200).json(updatedCompany);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
})

//setting limit for post requests
const postApiLimiter = rateLimit({
    max: 50,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many accounts created from this IP, please try again after an hour' // message to send
});

// Create new company
companyRouter.post('/', postApiLimiter, async (req, res) => {
    let newCompany: Company = req.body;
    console.log(`New company: ${newCompany}`);
    try {
        newCompany = await pool.query(`INSERT INTO ${companyTable} 
        (companyName),
        (companyDescription),
        (logoURL),
        (companyURL),
        (companyLocation)
        VALUES 
        ($1),
        ($2),
        ($3),
        ($4),
        ($5)
        RETURNING *`, 
        [
            newCompany.companyName,
            newCompany.companyDescription,
            newCompany.logoURL,
            newCompany.companyURL,
            newCompany.companyLocation,
        ]);
        console.log("New company created", newCompany);
        return res.status(200).json(newCompany);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
})

// Delete company
companyRouter.delete(':id', async (req, res) => {
    const {id} = req.params;
    try {
        await pool.query(`DELETE FROM ${companyTable} WHERE id = ($1)`, [id]);
        console.log(`company deleted`);
        return res.status(200).json({message: "Company deleted"});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
})

export default companyRouter;
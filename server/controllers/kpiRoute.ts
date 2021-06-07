import express from 'express';
import pool from '../db';
import { KPI } from '../types/kpis';

const kpiRouter = express.Router();

// Setting tables depending on NODE_ENV
const companyTable = process.env.NODE_ENV === 'production' ? 'companny' : 'company_test';
const reviewTable = process.env.NODE_ENV === 'production' ? 'review' : 'review_test';

// Get all key kpis
kpiRouter.get('/', async (req, res) => {
    try {
        const keyKpi = await pool.query
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});    }
});

export default {
    kpiRouter
}
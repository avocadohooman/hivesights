/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import pool from '../db';
import { KPI } from '../types/kpis';

const kpiRouter = express.Router();

// Setting tables depending on NODE_ENV
const reviewTable = process.env.NODE_ENV === 'production' ? 'review' : 'review_test';
console.log(`Using table for kpiRoute: ${reviewTable}`);

// Get all key kpis
kpiRouter.get('/', async (req, res) => {
    try {
        const keyKpi = await pool.query(`SELECT 
        AVG (totalRating)::NUMERIC(10,2) as averagescore, 
        AVG (salary)::NUMERIC(10,2) as averagesalary, 
        AVG (duration)::NUMERIC(10,2) as averageduration,
        COUNT (*) as reviews
        FROM ${reviewTable}`);
        if (keyKpi.rows[0].reviews === '0') {
            keyKpi.rows[0].reviews = null;
        }
        const returnKPI: KPI = {
            averageDuration: keyKpi.rows[0].averageduration,
            averageSalary: keyKpi.rows[0].averagesalary,
            averageScore: keyKpi.rows[0].averagescore,
            reviews: keyKpi.rows[0].reviews
        };
        return res.status(200).json(returnKPI);
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});    }
});

export default kpiRouter;
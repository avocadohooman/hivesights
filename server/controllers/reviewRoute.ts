import express from 'express';
import pool from '../db';
import { NewReview } from '../types/review';
import parsingService from '../services/reviewParsing';

const reviewRouter = express.Router();

// Setting up table depending on NODE_ENV
const reviewTable = process.env.NODE_END === 'production' ? 'review' : 'review_test';
console.log(`Using table: ${reviewTable}`);

// Get all reviews in DB
reviewRouter.get('/', async (req, res) => {
    try {
        const allReviews = await pool.query(`SELECT * FROM ${reviewTable}`);
        return res.status(200).json(allReviews.rows);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

// Create a new review for a company
reviewRouter.post('/:id', async (req, res) => {
    try {
        const newReview: NewReview = parsingService.parsingReview(req.body);
    } catch (error) {
        
    }
})

// Get one particular review


// Update a review


// Delete a review


export default reviewRouter;
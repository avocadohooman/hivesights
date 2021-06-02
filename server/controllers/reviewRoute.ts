import express from 'express';
import pool from '../db';
import { NewReview } from '../types/review';
import parsingService from '../services/reviewParsing';
import companyServices from '../services/companyServices';
import reviewServices from '../services/reviewServices';
import axios from 'axios';
import CONFIG from '../utils/config';
import { CompanyRating } from '../types/company';



const reviewRouter = express.Router();
// Setting up table depending on NODE_ENV
const reviewTable = process.env.NODE_END === 'production' ? 'review' : 'review_test';
const companyTable = process.env.NODE_END === 'production' ? 'company' : 'company_test';
console.log(`Using table: ${reviewTable}`);
const reviewColumns = '(companyid, username, userpictureurl, pros, cons, overall, totalrating, ratingcriteriainterview, ratingcriteriaonboarding, ratingcriteriasupervision, ratingcriterialearning, ratingcriteriacodingpractices, ratingcriteriaperks, ratingcriteriaculture, salary, duration, coverletter, cv)';
const baseUrl = 'http://localhost:' + CONFIG.PORT;
console.log(`Review router ${baseUrl}`);

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
        const newReview: NewReview = parsingService.parsingReview(req.body, req.params.id);
        if (newReview) {
            const companyId: string = req.params.id;
            console.log("Company ID", companyId);
            if (!await companyServices.checkIfExists(companyId)) {
                console.log("Company doesn't exist ERROR");
                return res.status(400).json({error: "Company doesn't exist."});    
            }
            console.log("Company Exists");
            const addedReview = await pool.query(`INSERT INTO ${reviewTable} 
            ${reviewColumns}
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            RETURNING *`, 
            [
                companyId,
                newReview.userName,
                newReview.userPicture,
                newReview.pros,
                newReview.cons,
                newReview.overall,
                newReview.totalRating,
                newReview.ratingCriteriaInterview,
                newReview.ratingCriteriaOnboarding,
                newReview.ratingCriteriaSupervision,
                newReview.ratingCriteriaLearning,
                newReview.ratingCriteriaCodingPractices,
                newReview.ratingCriteriaPerks,
                newReview.ratingCriteriaCulture,
                newReview.salary,
                newReview.duration,
                newReview.coverLetter,
                newReview.cv
            ])
            .catch((e:any) => {
                if (e) {
                  console.log("ERROR", e);
                  return res.status(400).json({e: e.message});
                }
            });
            await reviewServices.updateAverageSalary(companyId, reviewTable, companyTable);
            await reviewServices.updateScores(companyId, reviewTable, companyTable);
            return res.status(200).json(addedReview.rows[0]); 
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
})

// Get one particular review


// Get reviews for one company


// Update a review


// Delete a review


export default reviewRouter;
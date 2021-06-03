import express from 'express';
import pool from '../db';
import { NewReview } from '../types/review';
import parsingService from '../services/reviewParsing';
import companyServices from '../services/companyServices';
import reviewServices from '../services/reviewServices';
import reviewQueries from '../utils/reviewDBQueries';

const reviewRouter = express.Router();
// Setting up table depending on NODE_ENV
const reviewTable = process.env.NODE_END === 'production' ? 'review' : 'review_test';
const companyTable = process.env.NODE_END === 'production' ? 'company' : 'company_test';
console.log(`Using table: ${reviewTable}`);

const reviewColumns = reviewQueries.reviewColumns;

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

// Get one particular review
reviewRouter.get('/:id', async (req, res) => {
    const id: string = req.params.id;
    try {
        if (!await reviewServices.checkIfExists(id, reviewTable)) {
            console.log("Review doesn't exist ERROR");
            return res.status(400).json({error: "Review doesn't exist."});
        }
        const review = await pool.query(`SELECT * FROM ${reviewTable} WHERE id = ($1)`, [id]);
        console.log(`Review ${review.rows[0]} fetched`);;
        return res.status(200).json(review.rows[0]);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).json({error: error.message});
    }
})

// Get all reviews for a company
reviewRouter.get('/company/:id', async (req, res) => {
    const id: string = req.params.id;
    try {
        if (!await companyServices.checkIfExists(id, companyTable)) {
            console.log("Company doesn't exist ERROR");
            return res.status(400).json({error: "Company doesn't exist."});
        }
        const reviews = await pool.query(`SELECT * FROM ${reviewTable} WHERE companyid = ($1)`, [id]);
        console.log('Reviews fetched', reviews.rows);
        return res.status(200).json(reviews.rows);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).json({error: error.message});
    }
})

// Create a new review for a company
reviewRouter.post('/:id', async (req, res) => {
    try {
        const newReview: NewReview = parsingService.parsingReview(req.body, req.params.id);
        newReview.totalRating = reviewServices.calculateTotalScore(newReview);
        console.log("Total Score: ", newReview.totalRating);
        if (newReview) {
            const companyId: string = req.params.id;
            if (!await companyServices.checkIfExists(companyId, companyTable)) {
                console.log("Company doesn't exist ERROR");
                return res.status(400).json({error: "Company doesn't exist."});    
            } 
            if (!await reviewServices.checkDuplicate(newReview, reviewTable)) {
                console.log("Review for this company exists already");
                return res.status(400).json({error: `Review for this company by ${newReview.userName} already exists`}); 
            }
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
        return res.status(400).json({error: error.message});
    }
})

// Update a review
reviewRouter.put('/:id', async (req, res) => {
    const reviewId: string = req.params.id;
    const companyId: string = req.body.companyId;
    try {
        if (!await reviewServices.checkIfExists(reviewId, reviewTable)) {
            console.log("Review doesn't exist ERROR");
            return res.status(400).json({error: "Review doesn't exist."});
        }
        if (!await companyServices.checkIfExists(companyId, companyTable)) {
            console.log("Company doesn't exist ERROR");
            return res.status(400).json({error: "Company doesn't exist."});
        }
        const updatedReviewBody: NewReview = parsingService.parsingReview(req.body, companyId);
        updatedReviewBody.totalRating = reviewServices.calculateTotalScore(updatedReviewBody);
        console.log("Total Score: ", updatedReviewBody.totalRating);
        const updatedReview = await pool.query(`UPDATE ${reviewTable} 
        SET
        ${reviewQueries.updateReviewColumns}
        WHERE id = ($18)`, 
        [
            updatedReviewBody.userName,
            updatedReviewBody.userPicture,
            updatedReviewBody.pros,
            updatedReviewBody.cons,
            updatedReviewBody.overall,
            updatedReviewBody.totalRating,
            updatedReviewBody.ratingCriteriaInterview,
            updatedReviewBody.ratingCriteriaOnboarding,
            updatedReviewBody.ratingCriteriaSupervision,
            updatedReviewBody.ratingCriteriaLearning,
            updatedReviewBody.ratingCriteriaCodingPractices,
            updatedReviewBody.ratingCriteriaPerks,
            updatedReviewBody.ratingCriteriaCulture,
            updatedReviewBody.salary,
            updatedReviewBody.duration,
            updatedReviewBody.coverLetter,
            updatedReviewBody.cv,
            reviewId
        ]);
        console.log(`Review ${updatedReview.rows[0]} udpated`);;
        await reviewServices.updateAverageSalary(companyId, reviewTable, companyTable);
        await reviewServices.updateScores(companyId, reviewTable, companyTable);
        return res.status(200).json(updatedReview.rows[0]);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).json({error: error.message});
    }
})

// Delete a review
reviewRouter.delete('/:id', async (req, res) => {
    const reviewId: string = req.params.id;
    try {
        if (!await reviewServices.checkIfExists(reviewId, reviewTable)) {
            console.log("Review doesn't exist ERROR");
            return res.status(400).json({error: "Review doesn't exist."});
        }
        await pool.query(`DELETE FROM ${reviewTable} WHERE id = ($1)`, [reviewId]);
        console.log('review deleted');
        return res.status(200).json({message: 'Review deleted'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
})

export default reviewRouter;
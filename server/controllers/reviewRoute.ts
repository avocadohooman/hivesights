import express from 'express';
import pool from '../db';
import { NewReview, Review, ReviewDB } from '../types/review';
import parsingService from '../services/reviewParsing';
import companyServices from '../services/companyServices';
import reviewServices from '../services/reviewServices';
import reviewQueries from '../utils/reviewDBQueries';
import middleware from '../middleware/middleware';
import jwt from 'jsonwebtoken';

const reviewRouter = express.Router();
// Setting up table depending on NODE_ENV
const reviewTable = process.env.NODE_END === 'production' ? 'review' : 'review_test';
const companyTable = process.env.NODE_END === 'production' ? 'company' : 'company_test';
console.log(`Using table: ${reviewTable}`);

const reviewColumns = reviewQueries.reviewColumns;

// Get all reviews in DB
reviewRouter.get('/', async (req, res) => {
    try {
        const allReviewsDB = await pool.query(`SELECT * FROM ${reviewTable}`);
        let allReviews: Review[] = [];
        allReviews = allReviewsDB.rows.map((row: ReviewDB) => ({
            id: row.id,
            companyId: row.companyid,
            userName: row.username,
            userPicture: row.userpictureurl,
            pros: row.pros,
            cons: row.cons,
            overall: row.overall,
            totalRating: row.totalrating,
            ratingCriteriaInterview: row.ratingcriteriainterview,
            ratingCriteriaOnboarding: row.ratingcriteriaonboarding,
            ratingCriteriaSupervision: row.ratingcriteriasupervision,
            ratingCriteriaLearning: row.ratingcriterialearning,
            ratingCriteriaCodingPractices: row.ratingcriteriacodingpractices,
            ratingCriteriaPerks: row.ratingcriteriaperks,
            ratingCriteriaCulture: row.ratingcriteriaculture,
            salary: row.salary,
            duration: row.duration,
            coverLetter: row.coverletter,
            cv: row.cv,
            upVotes: row.upvotes,
            upVoteUsers: row.upvoteusers,
            downVotes: row.downvotes,
            downVoteUsers: row.downvoteusers,
            publishedDate: row.published_date
        }));
        return res.status(200).json(allReviews);
    } catch (error: any) {
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
        const reviewDB = await pool.query(`SELECT * FROM ${reviewTable} WHERE id = ($1)`, [id]);
        let review: Review[] = [];
        review = reviewDB.rows.map((row: ReviewDB) => ({
            id: row.id,
            companyId: row.companyid,
            userName: row.username,
            userPicture: row.userpictureurl,
            pros: row.pros,
            cons: row.cons,
            overall: row.overall,
            totalRating: row.totalrating,
            ratingCriteriaInterview: row.ratingcriteriainterview,
            ratingCriteriaOnboarding: row.ratingcriteriaonboarding,
            ratingCriteriaSupervision: row.ratingcriteriasupervision,
            ratingCriteriaLearning: row.ratingcriterialearning,
            ratingCriteriaCodingPractices: row.ratingcriteriacodingpractices,
            ratingCriteriaPerks: row.ratingcriteriaperks,
            ratingCriteriaCulture: row.ratingcriteriaculture,
            salary: row.salary,
            duration: row.duration,
            coverLetter: row.coverletter,
            cv: row.cv,
            upVotes: row.upvotes,
            upVoteUsers: row.upvoteusers,
            downVotes: row.downvotes,
            downVoteUsers: row.downvoteusers,
            publishedDate: row.published_date
        }));
        return res.status(200).json(review);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return res.status(400).json({error: error.message});
    }
});

// Get all reviews for a company
reviewRouter.get('/company/:id', async (req, res) => {
    const id: string = req.params.id;
    try {
        if (!await companyServices.checkIfExists(id, companyTable)) {
            console.log("Company doesn't exist ERROR");
            return res.status(400).json({error: "Company doesn't exist."});
        }
        const reviewsDB = await pool.query(`SELECT * FROM ${reviewTable} WHERE companyid = ($1)`, [id]);
        let reviews: Review[] = [];
        reviews = reviewsDB.rows.map((row: ReviewDB) => ({
            id: row.id,
            companyId: row.companyid,
            userName: row.username,
            userPicture: row.userpictureurl,
            pros: row.pros,
            cons: row.cons,
            overall: row.overall,
            totalRating: row.totalrating,
            ratingCriteriaInterview: row.ratingcriteriainterview,
            ratingCriteriaOnboarding: row.ratingcriteriaonboarding,
            ratingCriteriaSupervision: row.ratingcriteriasupervision,
            ratingCriteriaLearning: row.ratingcriterialearning,
            ratingCriteriaCodingPractices: row.ratingcriteriacodingpractices,
            ratingCriteriaPerks: row.ratingcriteriaperks,
            ratingCriteriaCulture: row.ratingcriteriaculture,
            salary: row.salary,
            duration: row.duration,
            coverLetter: row.coverletter,
            cv: row.cv,
            upVotes: row.upvotes,
            upVoteUsers: row.upvoteusers,
            downVotes: row.downvotes,
            downVoteUsers: row.downvoteusers,
            publishedDate: row.published_date
        }));
        console.log('Reviews fetched', reviews);
        return res.status(200).json(reviews);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return res.status(400).json({error: error.message});
    }
});

// Create a new review for a company
reviewRouter.post('/:id', async (req, res) => {
    try {
        const newReview: NewReview = parsingService.parsingReview(req.body, req.params.id);
        console.log("Total Score: ", newReview.totalRating);
        if (newReview) {
            const companyId: string = req.params.id;
            if (!await companyServices.checkIfExists(companyId, companyTable)) {
                console.log("Company doesn't exist ERROR");
                return res.status(400).json({error: "Company doesn't exist."});    
            } 
            if (!await reviewServices.checkDuplicate(newReview, reviewTable)) {
                console.log("Review for this company exists already");
                return res.status(400).json({error: `Review for this company by ${newReview.userName} already exists, or ${newReview.userName} has already written a review for another company`}); 
            }
            await reviewServices.addReview(newReview, reviewTable, companyTable);
            return res.status(200).json(newReview); 
        }
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return res.status(400).json({error: error.message});
    }
});

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
        // updatedReviewBody.totalRating = reviewServices.calculateTotalScore(updatedReviewBody);
        console.log("Updated Review Body ", updatedReviewBody);
        const updatedReview = await pool.query(`UPDATE ${reviewTable} 
        SET
        ${reviewQueries.updateReviewColumns}
        WHERE id = ($22)`, 
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
            updatedReviewBody.upVotes,
            updatedReviewBody.upVoteUsers,
            updatedReviewBody.downVotes,
            updatedReviewBody.downVoteUsers,
            reviewId
        ]);
        console.log(`Review udpated`, updatedReview);
        await reviewServices.updateAverageSalary(companyId, reviewTable, companyTable);
        await reviewServices.updateScores(companyId, reviewTable, companyTable);
        await reviewServices.updateAverageDuration(companyId, reviewTable, companyTable);
        await reviewServices.updateAmountOfReviews(companyId, reviewTable, companyTable);
        return res.status(200).json(updatedReview.rows[0]);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return res.status(400).json({error: error.message});
    }
});

// Delete a review
reviewRouter.delete('/:id', middleware.userExtractorReviewRights, async (req: any, res: any) => {
    const reviewId: string = req.params.id;
    try {
        if (!await reviewServices.checkIfExists(reviewId, reviewTable)) {
            console.log("Review doesn't exist ERROR");
            return res.status(400).json({error: "Review doesn't exist."});
        }
        const companyIdDB = await pool.query(`SELECT companyid FROM ${reviewTable} WHERE id = ($1)`, [reviewId]);
        const companyId = companyIdDB.rows[0].companyid;    
        await pool.query(`DELETE FROM ${reviewTable} WHERE id = ($1)`, [reviewId]);
        await reviewServices.updateAverageSalary(companyId, reviewTable, companyTable);
        await reviewServices.updateScores(companyId, reviewTable, companyTable);
        await reviewServices.updateAverageDuration(companyId, reviewTable, companyTable);
        await reviewServices.updateAmountOfReviews(companyId, reviewTable, companyTable);
        console.log('review deleted');
        return res.status(200).json({message: 'Review deleted'});
    } catch (error: any) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
});

export default reviewRouter;
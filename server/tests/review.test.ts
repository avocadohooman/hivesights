import app from '../app';
import request from 'supertest';
import { NewReview } from '../types/review';
import helper from './reviewTestSetup';
import pool from '../db';
import reviewDBQueries from '../utils/reviewDBQueries';
import reviewServices from '../services/reviewServices';

const api = request(app);
const reviewTable = 'review_test';
const companyTable = 'company_test';
const reviewColumns = reviewDBQueries.reviewColumns;
const apiBaseUrl = '/api/reviews';

//clearing review database and fetching correct company ids before each test
beforeEach(async () => {
    try {
        console.log(`clearing ${reviewTable}`);
        await pool.query(`DELETE FROM ${reviewTable}`);
        console.log(`${reviewTable} cleared`);

        console.log(`fetching latest company ids from ${companyTable}`);
        const wunderDogId = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ['Wunderdog']);
        const futuriceId = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ['Futurice']);
        console.log(`Got Wunderdog ID: ${wunderDogId.rows[0].id} and Futurice ID: ${futuriceId.rows[0].id}`);
        helper.intialReviews[0].companyId = wunderDogId.rows[0].id;
        helper.intialReviews[1].companyId = wunderDogId.rows[0].id;
        helper.intialReviews[2].companyId = futuriceId.rows[0].id;
        helper.intialReviews[3].companyId = futuriceId.rows[0].id;
        
        console.log(`Populating ${reviewTable}`);
        await helper.populatingTable();
        console.log(`${reviewTable} populated`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
});

// Testing GET API methods including error cases
describe('Review GET /', () => {
    test("Getting all reviews", async () => {
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
    });

    test("Getting one review with ID", async () => {
        const allReview = await api.get(`${apiBaseUrl}`);
        const reviewId = allReview.body[0].id;
        const reviewWithId = await api.get(`${apiBaseUrl}/${reviewId}`);
        expect(reviewWithId.statusCode).toBe(200);
        expect(reviewWithId.body.id).toBe(reviewId);
    });

    test("Getting error with invalid ID", async () => {
        const reviewWithWrongId = await api.get(`${apiBaseUrl}/1`);
        expect(reviewWithWrongId.statusCode).toBe(400);
    })
})

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
const apiBaseUrl = '/api/review/';

//clearing review database and fetching correct company ids before each test
beforeEach(async () => {
    try {
        console.log(`clearing ${reviewTable}`);
        await pool.query(`DELETE FROM ${reviewTable}`);
        console.log(`${reviewTable} cleared`);

        console.log(`fetching latest company ids from ${companyTable}`);
        const wunderDogId = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ['Wunderdog']);
        const futuriceId = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ['Futurice']);
        helper.intialReviews[0].companyId = wunderDogId.rows[0].id;
        helper.intialReviews[1].companyId = wunderDogId.rows[0].id;
        helper.intialReviews[2].companyId = futuriceId.rows[0].id;
        helper.intialReviews[3].companyId = futuriceId.rows[0].id;
        console.log(`Got Wunderdog ID: ${helper.intialReviews[0].companyId} and Futurice ID: ${helper.intialReviews[1].companyId}`);
        
        console.log(`Populating ${reviewTable}`);
        await helper.populatingTable();
        console.log(`${reviewTable} populated`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
});

test("Getting the right id", () => {
    let a = 1;
    expect(a).toBe(1);
})
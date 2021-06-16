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

// Getting latest company ids from company_table
beforeAll(async () => {
    try {
        // console.log(`fetching latest company ids from ${companyTable}`);
        const getWunderdogId = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ['Wunderdog']);
        const getFuturiceId = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ['Futurice']);
        // console.log(`Got Wunderdog ID: ${getWunderdogId.rows[0].id} and Futurice ID: ${getFuturiceId.rows[0].id}`);
        helper.intialReviews[0].companyId = getWunderdogId.rows[0].id;
        helper.intialReviews[1].companyId = getWunderdogId.rows[0].id;
        helper.intialReviews[2].companyId = getFuturiceId.rows[0].id;
        helper.intialReviews[3].companyId = getFuturiceId.rows[0].id;
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
})

// clearing review database and fetching correct company ids once before all tests
beforeEach(async () => {
    try {
        // console.log(`clearing ${reviewTable}`);
        await pool.query(`DELETE FROM ${reviewTable}`);
        // console.log(`${reviewTable} cleared`);
        
        // console.log(`Populating ${reviewTable}`);
        await helper.populatingTable();
        // console.log(`${reviewTable} populated`);
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
        expect(reviewWithId.body[0].id).toBe(reviewId);
    });

    test("Getting error with invalid ID", async () => {
        const reviewWithWrongId = await api.get(`${apiBaseUrl}/1`);
        expect(reviewWithWrongId.statusCode).toBe(400);
    })
});

// Testing POST API methods 
describe('Review POST /', () => {
    test("Adding a review works", async () => {
        const newReview = {
            companyId: "",
            userName: "Unicorn01",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none"
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        newReview.companyId = company.rows[0].id;
        await api
            .post(`${apiBaseUrl}/${newReview.companyId}`)
            .send(newReview)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        const companyTotalScore = await pool.query(`SELECT averagetotalscore FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyAverageSalary = await pool.query(`SELECT averagesalaries FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyScoreTwoDec: string = companyTotalScore.rows[0].averagetotalscore.toFixed(2);
        
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(5);
        expect(allReview.body[4].userName).toBe('Unicorn01');
        expect(allReview.body[4].totalRating).toBe(3);
        expect(companyScoreTwoDec).toBe(allReview.body[4].totalRating.toFixed(2));
        expect(allReview.body[4].salary).toBe(companyAverageSalary.rows[0].averagesalaries);
    });
    test("Adding a review with empty pros works", async () => {
        const newReview = {
            companyId: "",
            userName: "Unicorn01",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        newReview.companyId = company.rows[0].id;
        await api
            .post(`${apiBaseUrl}/${newReview.companyId}`)
            .send(newReview)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        const companyTotalScore = await pool.query(`SELECT averagetotalscore FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyAverageSalary = await pool.query(`SELECT averagesalaries FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyScoreTwoDec: string = companyTotalScore.rows[0].averagetotalscore.toFixed(2);

        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(5);
        expect(allReview.body[4].userName).toBe('Unicorn01');
        expect(allReview.body[4].totalRating).toBe(4);
        expect(companyScoreTwoDec).toBe(allReview.body[4].totalRating.toFixed(2));
        expect(allReview.body[4].salary).toBe(companyAverageSalary.rows[0].averagesalaries);
    });
    test("Adding a review with empty cons works", async () => {
        const newReview = {
            companyId: "",
            userName: "Unicorn01",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        newReview.companyId = company.rows[0].id;
        await api
            .post(`${apiBaseUrl}/${newReview.companyId}`)
            .send(newReview)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        const companyTotalScore = await pool.query(`SELECT averagetotalscore FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyAverageSalary = await pool.query(`SELECT averagesalaries FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyScoreTwoDec: string = companyTotalScore.rows[0].averagetotalscore.toFixed(2);

        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(5);
        expect(allReview.body[4].userName).toBe('Unicorn01');
        expect(allReview.body[4].totalRating).toBe(4);
        expect(companyScoreTwoDec).toBe(allReview.body[4].totalRating.toFixed(2));
        expect(allReview.body[4].salary).toBe(companyAverageSalary.rows[0].averagesalaries);
    });
    test("Adding a review with total score 0 works", async () => {
        const newReview = {
            companyId: "",
            userName: "Unicorn01",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 0,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        newReview.companyId = company.rows[0].id;
        await api
            .post(`${apiBaseUrl}/${newReview.companyId}`)
            .send(newReview)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        const companyTotalScore = await pool.query(`SELECT averagetotalscore FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyAverageSalary = await pool.query(`SELECT averagesalaries FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        const companyScoreTwoDec: string = companyTotalScore.rows[0].averagetotalscore.toFixed(2);
        
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(5);
        expect(allReview.body[4].userName).toBe('Unicorn01');
        expect(allReview.body[4].totalRating).toBe(0);
        expect(companyScoreTwoDec).toBe(allReview.body[4].totalRating.toFixed(2));
        expect(allReview.body[4].salary).toBe(companyAverageSalary.rows[0].averagesalaries);
    });
});

// Testing POST API methods error management
describe('Review ERROR POST /', () => {
    const newReview = {
        companyId: "",
        userName: "Unicorn01",
        userPicture: "gmolin",
        pros: "Great culture Nice perks Amazing office",
        cons: "Some projects are quite boring",
        overall: "A great place to grow as software developer",
        totalRating: 4,
        ratingCriteriaInterview: 4,
        ratingCriteriaOnboarding: 2,
        ratingCriteriaSupervision: 4,
        ratingCriteriaLearning: 4,
        ratingCriteriaCodingPractices: 4,
        ratingCriteriaPerks: 5,
        ratingCriteriaCulture: 4,
        salary: 3800,
        duration: 6,
        coverLetter: "none",
        cv: "none" 
    };
    test('Adding a review with a wrong company id cannot be added', async () => {
        await api
            .post(`${apiBaseUrl}/1`)
            .send(newReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding two reviews for the same company cannot be added', async () => {
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(newReview)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(newReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(5);
    });
});

// Testing parsing service error management using the POST method
describe('Testing parsing error managment', () => {
    test('Adding review with wrong userName datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: 1,
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with too long review headlin cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "gmolin",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developerA great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong userPicture datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: 1,
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with less than five words for ros or cons cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "shit",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong pros datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: 1,
            pros: [1, 2],
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong cons datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: 1,
            pros: "Great culture Nice perks Amazing office",
            cons: [1, 2],
            overall: "A great place to grow as software developer",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong overall datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: 1,
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: false,
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong totalRating datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: "4",
            ratingCriteriaInterview: "4",
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with totalRating score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: -2323,
            ratingCriteriaInterview: 6,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with totalRating score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 666,
            ratingCriteriaInterview: -1,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong ratingCriteriaInterview datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: "4",
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaInterview score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 6,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaInterview score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: -1,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong ratingCriteriaOnboarding datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: "2",
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaOnboarding score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 89,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaOnboarding score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 0,
            ratingCriteriaOnboarding: -389,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong ratingCriteriaSupervision datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: "4",
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaSupervision score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4444,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaSupervision score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 0,
            ratingCriteriaOnboarding: 4,
            ratingCriteriaSupervision: -389,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong ratingCriteriaLearning datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: "4",
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaLearning score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 4444,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaLearning score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 0,
            ratingCriteriaOnboarding: 4,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: -389,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong ratingCriteriaCodingPractices datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: "s",
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaCodingPractices score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 3,
            ratingCriteriaCodingPractices: 4444,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaCodingPractices score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 0,
            ratingCriteriaOnboarding: 4,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: -389,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong ratingCriteriaPerks datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: 2,
            ratingCriteriaPerks: "2",
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaPerks score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 3,
            ratingCriteriaCodingPractices: 1,
            ratingCriteriaPerks: 4444,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaPerks score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 0,
            ratingCriteriaOnboarding: 4,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: 1,
            ratingCriteriaPerks: -389,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });

    test('Adding review with wrong ratingCriteriaCulture datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: 2,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: "",
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaCulture score range > 5 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 3,
            ratingCriteriaCodingPractices: 1,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: 4444,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with ratingCriteriaCulture score range < 0  cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 0,
            ratingCriteriaOnboarding: 4,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: 1,
            ratingCriteriaPerks: 1,
            ratingCriteriaCulture:  -389,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong ratingCriteriaCulture datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: 2,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: 2,
            salary: "2332",
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with salary range < 0 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 3,
            ratingCriteriaCodingPractices: 1,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: 2,
            salary: -232323,
            duration: 6,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong duration datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: 2,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: 2,
            salary: 23234234234,
            duration: false,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with duration range < 0 cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 3,
            ratingCriteriaCodingPractices: 1,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: 2,
            salary: 223,
            duration: -2323,
            coverLetter: "none",
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong coverLetter datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "d",
            totalRating: 4,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 2,
            ratingCriteriaCodingPractices: 2,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: 2,
            salary: 23234234234,
            duration: 223,
            coverLetter: 2323,
            cv: "none" 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
    test('Adding review with wrong cv datatype cannot be added', async () => {
        const wrongTypeReview = {
            companyId: "",
            userName: "1",
            userPicture: "1",
            pros: "Great culture Nice perks Amazing office",
            cons: "",
            overall: "1",
            totalRating: 4,
            ratingCriteriaInterview: 5,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 0,
            ratingCriteriaLearning: 3,
            ratingCriteriaCodingPractices: 1,
            ratingCriteriaPerks: 2,
            ratingCriteriaCulture: 2,
            salary: 223,
            duration: -2323,
            coverLetter: "none",
            cv: true 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Reaktor"]);
        await api
            .post(`${apiBaseUrl}/${company.rows[0].id}`)
            .send(wrongTypeReview)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
    });
});

//Testing review PUT api method
describe('Review PUT / ', () => {
    test("Updating a review works", async () => {
        const updatedReviewBody = {
            companyId: "",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: 1,
            upVoteUsers: ["npminof"],
            downVotes: 0,
            downVoteUsers: [] 
        };
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Wunderdog"]);
        updatedReviewBody.companyId = company.rows[0].id;
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        await api
            .put(`${apiBaseUrl}/${existingReview.rows[0].id}`)
            .send(updatedReviewBody)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body[3].userName).toBe('UNICORN0101010101');
        expect(allReview.body[3].totalRating).toBe(3);
        expect(allReview.body[3].upVotes).toBe(1);
        expect(allReview.body[3].upVoteUsers[0]).toBe('npminof');
    });
});

//Testing review PUT api method error managment
describe('Review PUT ERROR/ ', () => {
    test("Updating a review with wrong review ID doesnt work", async () => {
        const updatedReviewBody = {
            companyId: "",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: 1,
            upVoteUsers: ["npminof"],
            downVotes: 0,
            downVoteUsers: [] 
        };
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        await api
            .put(`${apiBaseUrl}/2`)
            .send(updatedReviewBody)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body).not.toContain('UNICORN0101010101');
    });
    test("Updating a review with non-existing company ID doesnt work", async () => {
        const updatedReviewBody = {
            companyId: "!!!!!e23dadsasdasdasda ddsadasd",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: 1,
            upVoteUsers: ["npminof"],
            downVotes: 0,
            downVoteUsers: [] 
        };
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        await api
            .put(`${apiBaseUrl}/${existingReview.rows[0].id}`)
            .send(updatedReviewBody)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body).not.toContain('UNICORN0101010101');
    });
    test("Updating a review with wrong vote datatype doesn't work", async () => {
        const updatedReviewBody = {
            companyId: "",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: "2",
            upVoteUsers: ["npminof"],
            downVotes: 0,
            downVoteUsers: [] 
        };
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Wunderdog"]);
        updatedReviewBody.companyId = company.rows[0].id;
        await api
            .put(`${apiBaseUrl}/${existingReview.rows[0].id}`)
            .send(updatedReviewBody)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body).not.toContain('UNICORN0101010101');
    });
    test("Updating a review with upVote less than 0 doesn't work", async () => {
        const updatedReviewBody = {
            companyId: "",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: -11,
            upVoteUsers: ["npminof"],
            downVotes: 0,
            downVoteUsers: [] 
        };
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Wunderdog"]);
        updatedReviewBody.companyId = company.rows[0].id;
        await api
            .put(`${apiBaseUrl}/${existingReview.rows[0].id}`)
            .send(updatedReviewBody)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body).not.toContain('UNICORN0101010101');
    });
    test("Updating a review with downVote less than 0 doesn't work", async () => {
        const updatedReviewBody = {
            companyId: "",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: 2,
            upVoteUsers: ["npminof"],
            downVotes: -454,
            downVoteUsers: [] 
        };
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Wunderdog"]);
        updatedReviewBody.companyId = company.rows[0].id;
        await api
            .put(`${apiBaseUrl}/${existingReview.rows[0].id}`)
            .send(updatedReviewBody)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body).not.toContain('UNICORN0101010101');
    });
    test("Updating a review with upVoteUsers datatype doesn't work", async () => {
        const updatedReviewBody = {
            companyId: "",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: 2,
            upVoteUsers: [0],
            downVotes: 1,
            downVoteUsers: [] 
        };
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Wunderdog"]);
        updatedReviewBody.companyId = company.rows[0].id;
        await api
            .put(`${apiBaseUrl}/${existingReview.rows[0].id}`)
            .send(updatedReviewBody)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body).not.toContain('UNICORN0101010101');
    });
    test("Updating a review with downVoteUsers datatype doesn't work", async () => {
        const updatedReviewBody = {
            companyId: "",
            userName: "UNICORN0101010101",
            userPicture: "gmolin",
            pros: "Great culture Nice perks Amazing office",
            cons: "Some projects are quite boring",
            overall: "A great place to grow as software developer",
            totalRating: 3,
            ratingCriteriaInterview: 4,
            ratingCriteriaOnboarding: 2,
            ratingCriteriaSupervision: 4,
            ratingCriteriaLearning: 4,
            ratingCriteriaCodingPractices: 4,
            ratingCriteriaPerks: 5,
            ratingCriteriaCulture: 4,
            salary: 3800,
            duration: 6,
            coverLetter: "none",
            cv: "none",
            upVotes: 2,
            upVoteUsers: ["npimenof"],
            downVotes: 1,
            downVoteUsers: false 
        };
        const existingReview = await pool.query(`SELECT id FROM ${reviewTable} WHERE username = ($1)`, ["gmolin"]);
        const company = await pool.query(`SELECT id FROM ${companyTable} WHERE companyname = ($1)`, ["Wunderdog"]);
        updatedReviewBody.companyId = company.rows[0].id;
        await api
            .put(`${apiBaseUrl}/${existingReview.rows[0].id}`)
            .send(updatedReviewBody)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.body).not.toContain('UNICORN0101010101');
    });
});

// Testing review DELETE api methods
describe('Review DELETE /', () => {
    test('a review can be deleted', async () => {
        let allReview = await api.get(`${apiBaseUrl}`);
        const reviewId = allReview.body[0].id;

        await api
            .delete(`${apiBaseUrl}/${reviewId}`)
            .expect(200)
        allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(3);
        expect(allReview.statusCode).toBe(200);
        expect(allReview.body).not.toContain(reviewId);
    })
});

// Testing review DELETE api methods error management
describe('Review DELETE /', () => {
    test('a non-existing review cannot be deleted', async () => {

        await api
            .delete(`${apiBaseUrl}/2323232323`)
            .expect(400)
        let allReview = await api.get(`${apiBaseUrl}`);
        expect(allReview.body).toHaveLength(4);
        expect(allReview.statusCode).toBe(200);
    })
});

afterAll(async () => {
	await pool.end();
	console.log('pool has drained');
});

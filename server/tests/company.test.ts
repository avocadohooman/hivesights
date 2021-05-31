import pool from '../db';
import app from '../app';
import request from 'supertest';
import helper from './companyTestSetup';

const api = request(app);
const table = 'company_test';
const companyColumns = '(companyName, companyDescription, logoURL, companyURL, companyLocation)';

//clearing database before each test
beforeEach(async () => {
    try {
        console.log(`clearning ${table} table`);
        await pool.query(`DELETE FROM ${table} *`);
        console.log(`${table} cleared`);

        console.log(`Populating ${table}`);
        await pool.query(`INSERT INTO ${table} ${companyColumns} VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [
            helper.intialCompanies[0].companyName,
            helper.intialCompanies[0].companyDescription,
            helper.intialCompanies[0].logoURL,
            helper.intialCompanies[0].companyURL,
            helper.intialCompanies[0].companyLocation
        ]);
        await pool.query(`INSERT INTO ${table} ${companyColumns} VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [
            helper.intialCompanies[1].companyName,
            helper.intialCompanies[1].companyDescription,
            helper.intialCompanies[1].logoURL,
            helper.intialCompanies[1].companyURL,
            helper.intialCompanies[1].companyLocation
        ]);
        await pool.query(`INSERT INTO ${table} ${companyColumns} VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [
            helper.intialCompanies[2].companyName,
            helper.intialCompanies[2].companyDescription,
            helper.intialCompanies[2].logoURL,
            helper.intialCompanies[2].companyURL,
            helper.intialCompanies[2].companyLocation
        ]);
        console.log(`${table} populated`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
});

describe("GET / ", () => {
    test("Getting an array with all companies", async () => {
        const allCompanies = await api.get('/api/company/');
        const id = allCompanies.body[0].id;
        expect(allCompanies.statusCode).toBe(200);
        expect(allCompanies.body).toHaveLength(3);
    });

    test("Getting company by ID", async () => {
        const allCompanies = await api.get('/api/company/');
        const id = allCompanies.body[0].id;
        const companyWithId = await api.get(`/api/company/${id}`);
        expect(allCompanies.statusCode).toBe(200);
        expect(companyWithId.body.id).toBe(id);
    });

    test("Getting error with invalid ID", async () => {
        const companyWithWrongId = await api.get(`/api/company/1`);
        expect(companyWithWrongId.statusCode).toBe(400);
    })
});

describe("POST / ", () => {

});

describe("PUT / ", () => {

});

describe("DELETE / ", () => {

});

afterAll(async () => {
	await pool.end();
	console.log('pool has drained');
})

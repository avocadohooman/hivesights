import pool from '../db';
import helper from '../db/populateCompanyDb';
import app from '../app';
import request from 'supertest';

const table = 'company';
const api = request(app);
const companyColumns = '(companyName, companyDescription, logoURL, companyURL, companyLocation)';
const apiBaseUrl = '/api/company/';

//clearing database before each test
beforeEach(async () => {
    try {
        // console.log(`clearning ${table} table`);
        await pool.query(`DELETE FROM ${table} *`);
        // console.log(`${table} cleared`);

        // console.log(`Populating ${table}`);
        await helper.populateTable();
        // console.log(`${table} populated`);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
    }
});

// Testing GET API methods including error cases
describe("Company GET / ", () => {
    test("Getting an array with all companies", async () => {
        const allCompanies = await api.get(`${apiBaseUrl}`);
        const id = allCompanies.body[0].id;
        expect(allCompanies.statusCode).toBe(200);
    });
});
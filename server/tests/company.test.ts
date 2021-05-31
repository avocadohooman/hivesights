import pool from '../db';
import app from '../app';
import request from 'supertest';
import helper from './companyTestSetup';
import { NewCompany } from '../types/company';

const api = request(app);
const table = 'company_test';
const companyColumns = '(companyName, companyDescription, logoURL, companyURL, companyLocation)';
const apiBaseUrl = '/api/company/';

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

// Testing GET API including error cases
describe("GET / ", () => {
    test("Getting an array with all companies", async () => {
        const allCompanies = await api.get(`${apiBaseUrl}`);
        const id = allCompanies.body[0].id;
        expect(allCompanies.statusCode).toBe(200);
        expect(allCompanies.body).toHaveLength(3);
    });

    test("Getting company by ID", async () => {
        const allCompanies = await api.get(`${apiBaseUrl}`);
        const id = allCompanies.body[0].id;
        const companyWithId = await api.get(`${apiBaseUrl}${id}`);
        expect(allCompanies.statusCode).toBe(200);
        expect(companyWithId.body.id).toBe(id);
    });

    test("Getting error with invalid ID", async () => {
        const companyWithWrongId = await api.get(`/api/company/1`);
        expect(companyWithWrongId.statusCode).toBe(400);
    })
});

//Testing POST API 
describe("POST / ", () => {
    test("A new company can be created", async () => {
        const newCompany: NewCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(4);
        expect(allCompanies.body[3].companyname).toBe("Unicorn01");
        expect(allCompanies.statusCode).toBe(200);
    });
});

//Testing POST API error management
describe("POST ERROR /", () => {
    test("A an existing company cannot be created", async () => {
        const newCompany: NewCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(4);
        expect(allCompanies.statusCode).toBe(200);
    });
    test("A company with wrong company description type cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            companyDescription: 0,
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with wrong company name type cannot be created", async () => {
        const newCompany = {
            companyName: 0,
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with wrong logo type cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            logoURL: 0,
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with wrong company url type cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyURL: 22,
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with wrong companyLocation type cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: false
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with missing name cannot be created", async () => {
        const newCompany = {
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with missing description cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with missing logo cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            companyURL: "https://gerhardmolin.com/",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with missing company URL cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyLocation: "Helsinki, Finland"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })

    test("A company with missing location cannot be created", async () => {
        const newCompany = {
            companyName: "Unicorn01",
            companyDescription: "Software Development Agency",
            logoURL: "https://www.google.com",
            companyURL: "https://gerhardmolin.com/"
        };
        await api
            .post(`${apiBaseUrl}`)
            .send(newCompany)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.body).toHaveLength(3);
    })
});

describe("PUT / ", () => {

});

describe("DELETE / ", () => {

});

afterAll(async () => {
	await pool.end();
	console.log('pool has drained');
});

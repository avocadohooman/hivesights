import app from '../app';
import request from 'supertest';
import { KPI } from '../types/kpis';

const api = request(app);
const table = 'review_test';
const apiBaseUrl = '/api/kpi/';

// Testing GET API methods including error cases
describe("Company GET / ", () => {
    test("Getting key kpis", async () => {
        const allCompanies = await api.get(`${apiBaseUrl}`);
        expect(allCompanies.statusCode).toBe(200);
    });
});

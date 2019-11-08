const request = require('supertest');

let server = require('../../index');

describe('api/genres', () => {
    beforeEach( () => { server = require('../../index')})
    afterEach( () => { server.close(); })
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 500));
    });
    describe('GET', () => {
        it ('should return all genres', async () => {
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200);
        });
    });
});
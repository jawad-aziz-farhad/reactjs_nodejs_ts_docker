import app from '../app';
import * as request from "supertest";

describe('API tests', () => {
    it('checks application\'s health', async () => {
        const result = await request(app).get('/api/health');
        expect(JSON.parse(result.text)).toEqual({
            "status": "up",
        });
        expect(result.statusCode).toEqual(200);
    });
})

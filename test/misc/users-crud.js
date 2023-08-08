const supertest = require('supertest')
const request = supertest('https://gorest.co.in/public-api/')
const TOKEN = '2786dcaf18c1a06b0fdaaa02de64b87f9f4db0f71cf1f0e631eaab72ff5939ab'
const id = 3968322;

const { expect } = require('chai');

describe('CRUD operations for gorest.co.in for users', () => {
    it('GET /users - all users', async() => {
        const res = await request
            .get(`/users`)
            .set('Authorization',`Bearer ${TOKEN}`)
        await expect(res.body.data).to.be.not.empty
    });
    it('GET /users/id:', async() => {
        const res = await request
            .get(`/users/${id}`)
            .set('Authorization',`Bearer ${TOKEN}`)
            console.log(res.body.data)
        await expect(res.body.data).to.be.not.null
    });
    it('DELETE /users/id:', async() => {
        const res = await request
            .delete(`/users/${id}`)
            .set('Authorization',`Bearer ${TOKEN}`)
            console.log(res.body.data)
        await expect(res.body.data).to.be.null
    });
});


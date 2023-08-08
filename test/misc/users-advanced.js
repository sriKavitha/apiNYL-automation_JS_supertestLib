// const supertest =require('supertest');
const { expect } = require('chai');
import request from '../config/common'
require('dotenv').config()
// const request = supertest('https://gorest.co.in/public-api/');
// const TOKEN = '2786dcaf18c1a06b0fdaaa02de64b87f9f4db0f71cf1f0e631eaab72ff5939ab';
const TOKEN = process.env.USER_TOKEN
describe('USERS', () => {
    let userId;
    describe('POST', () => {
        it(' postuser', async () => {
            console.log("IS MY TOKEN\n\n\n",TOKEN)
            const data={
                email : `test-${Math.floor(Math.random()*1000)}@gmail.com`,
                name : 'ABC1a',
                status : 'active',
                gender : 'female'
            }
            const res=await request
            .post('users')
            .set('Authorization',`Bearer ${TOKEN}`)
            .send(data)
            userId = res.body.data.id;
            // console.log("Userid:", userId);
            expect(res.body.data).to.deep.include(data)
            expect(res.body.code).to.be.equal(201)
        });
        
    });
    describe('GET', () => {
        it('GET all users with /users', async () => {
            await request.get(`users?access-token=${TOKEN}`).then((res)=>{ 
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.data).to.not.be.empty;
            });
        });
        
        it('Get single user /users/:id', async () => {
            await request.get(`users/${userId}?access-token=${TOKEN}`).then((res)=>{
            expect(res.body).to.not.be.empty;
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.data.id).to.be.equal(userId);
            });
        });
        it('Get users using query parameters - from page4 who are active and female', async () => {
        const req = await request.get(`users?access-token=${TOKEN}&page=42&gender=female&status=active`)
        req.body.data.forEach((data)=>
        {
            // console.log(data)
            expect(data.gender).to.be.eq("female")
            expect(data.status).to.be.eq("active")
        });
        });
        
    });
    
    describe('PUT', () => {
    it(' users/:id', async () => {
        const data={
            name : `ABC1`,
            status : 'active',
            gender : 'male'
        }
        // -${Math.floor(Math.random()*1000)}`,
        const res = await request
                        .put(`users/${userId}`)
                        .set('Authorization',`Bearer ${TOKEN}`)
                        .send(data)
        // console.log("Body:",res.body.data)
        expect(res.body.data).to.deep.include(data);
    });    
    });
    
    describe('DELETE', () => {
        it('DELETE /users/:id', async () => {
            const res = await request
                            .delete(`users/${userId}`)
                            .set('Authorization',`Bearer ${TOKEN}`)
            console.log(res.body.data); // displays null as the record is deleted
            expect(res.body.data).to.be.eq(null)
        });    
    });
    
});
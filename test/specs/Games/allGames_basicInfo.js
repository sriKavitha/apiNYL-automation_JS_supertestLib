const supertest = require('supertest');
const { expect } = require('chai');
const ReadEnv = require('../../../utils/readEvn');
var request, data, apikey;

describe('NYL Games - Display basic info for all games',  () => {
    before(async()=>
    {
        // Read env and its corresponding uri and apikey from .env file
        data = await ReadEnv.getSecrets();

        // assign the URI and apikey after reading the data from the file 
        request = supertest(data[1]);
        apikey=data[2]
    })
        
    it('GET /megamillions/draws', async () => {
        
        try{
        const res = await request
            .get(`megamillions/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('12');
            expect(res.body.data.draws).to.not.be.null;
        } catch(err) 
        {
            throw ("Error...",err)
        }
    });
    it('GET /pick10/draws', async () => {
        try{
        const res = await request
            .get(`pick10/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('27');

        } catch(err) {
            throw ("Error...",err)
        }
    });
    it('GET /quickdraw/draws', async () => {
        try
        {
        const res = await request
            .get(`quickdraw/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('22');
        } catch(err) {
            throw ("Error...",err)
        }
    });
    it('GET /powerball/draws', async () => {
        try
        {
        const res = await request
            .get(`powerball/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('15');
        } catch(err) {
            throw ("Error...",err)
        }
    });
    it('GET /lotto/draws', async () => {
        try{
        const res = await request
            .get(`lotto/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('8');
        } catch(err) {
            throw ("Error...",err)
        }
    });
    it('GET /cash4life/draws', async () => {
        try{
        const res = await request
            .get(`cash4life/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('13');
        } catch(err) {
            throw ("Error...",err)
        }
    });
    it('GET /take5/draws', async () => {
        try{
        const res = await request
            .get(`take5/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('10');
        } catch(err) {
            throw ("Error...",err)
        }
    });
    it('GET /numbers/draws', async () => {
        try{
        const res = await request
            .get(`numbers/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('9');
        } catch(err) {
            throw ("Error...",err)
        }
    });
    it('GET /win4/draws', async () => {
        try{
        const res = await request
            .get(`win4/draws`)
            .set('x-api-key',`${apikey}`)
            
            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq('14');
        } catch(err) {
            throw ("Error...",err)
        }
    });
   });

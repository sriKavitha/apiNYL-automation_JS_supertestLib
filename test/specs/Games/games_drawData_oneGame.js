const supertest =require('supertest');
const { expect } = require('chai');
const request = supertest('https://api.nylservices.net/games/');
const apikey = '3httNHLjxN6KluYfd4DuH188SwgqgMDN3DyE2PVs';
describe('NYL Games', function ()  {
    it.only('GET /megamillions/draws', async () => {
        try{
        const res = await request
            .get(`powerball/draws`)
            .set('x-api-key',`${apikey}`)
            
            for (var i=0;i < res.body.data.draws.length;i++)
            {
                console.log(`===== Draw data for ${i} Game =====`)
                console.log(res.body.data.draws[i].results)
                expect(res.body.data.status).to.be.eq('SUCCESS');
                expect(res.body.data.statusCode).to.be.eq(200);
                // expect(res.body.data.gameId).to.be.eq('12');
                expect(res.body.data.draws).to.not.be.null;
            }
        } catch(err) {
            throw ("Error...",err)
        }
    });
    
   });

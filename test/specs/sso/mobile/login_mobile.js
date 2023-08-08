const supertest =require('supertest');
const { expect } = require('chai');
const request = supertest('https://api-stage.nylservices.net/sso/');
const Utils = require('../../../utils/readData');

describe('NYL SSO Mobile Registration', function ()  {
    let postData;
    before (async() => 
    {
        const data = await Utils.readData();

        postData = {
            clientId: await `${data.client_id}`,
            email : `test-${Math.floor(Math.random()*1000)}@gmail.com`,
            password: await `${data.pass_word}`,
            firstName :	await `${data.first_name}`,
            lastName : await `${data.last_name}`,
            phone: await `${data.ph}`
        }
        
    })
    it('/posts POST', async () => {
        const postRes = await request
        .post('register')
        .send(postData)

        console.log(postRes.body.data);
        expect(postRes.body.data.status).to.be.eq('SUCCESS');
        expect(postRes.body.data.statusCode).to.be.eq(200)
    }); 
});
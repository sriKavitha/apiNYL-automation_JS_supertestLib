const supertest =require('supertest');
const { expect } = require('chai');
const request = supertest('https://api-stage.nylservices.net/sso/');
const Utils = require('../../../utils/readData');

describe('NYL SSO Mobile Registration', function ()  {
    let postData;
    before (async() => 
    {
        const data = await Utils.readData();

        const clientID = await data.client_id;
        const email = `test-${Math.floor(Math.random()*1000)}@gmail.com`
        const pwd=await data.pass_word;
        const fname= await data.first_name;
        const lname= await data.last_name
        const phn= await data.ph;
        postData = {
            clientId: clientID,
             email : `test-${Math.floor(Math.random()*1000)}@gmail.com`,
            password: pwd,
            firstName :	fname,
            lastName : lname,
            phone: phn
        }
        
    })
    it('/posts POST', async () => {
        const postRes = await request
        .post('register')
        .send(postData)
        
        console.log(postRes.body)
    }); 
});
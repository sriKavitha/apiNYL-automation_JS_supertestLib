const supertest =require('supertest');
const { expect } = require('chai');
const request = supertest('https://api-stage.nylservices.net/');
const Utils = require('../../../utils/readData');

describe('NYL SSO Mobile Registration', function ()  {
    let postData_Register, postData_Login, postData_Logout =null;
    var access_token, client_ID, android_xapikey ;
    
    before (async() => 
    {
        // reading values from env.json file
        const data = await Utils.readData();

        const clientID = await data.client_id
        const eMail = `test-${Math.floor(Math.random()*1000)}@gmail.com`
        const passWord = await data.pass_word
        const firstname = await data.first_name
        const lastname = await data.last_name
        const phn = await data.ph
        android_xapikey = await data.android_x_api_key
        client_ID = clientID;
        postData_Register = {
            clientId: clientID,
            email : eMail,
            password: passWord,
            firstName :	firstname,
            lastName : lastname,
            phone: phn
        }
        postData_Login = {
            clientId: clientID,
            email : eMail,
            password: passWord
        }
        postData_Logout ={
            accessToken : access_token,
            clientId: clientID
        }
    })
    it.only('/posts POST - MOBILE REGISTER', async () => {
        const postRes = await request
        .post('sso/register')
        .send(postData_Register)

        // console.log(postRes.body.data);
        expect(postRes.body.data.status).to.be.eq('SUCCESS');
        expect(postRes.body.data.statusCode).to.be.eq(200)
    }); 

    it.only('/post - MOBILE LOGIN', async () => {
        const postRes = await request
        .post('sso/login')
        .send(postData_Login)

        access_token = postRes.body.data.AccessToken;
        expect(postRes.body.data.status).to.be.eq('SUCCESS');
        expect(postRes.body.data.statusCode).to.be.eq(200)
    }); 

    it.skip('/post - MOBILE LOGOUT', async () => {
        postData_Logout ={
            accessToken : access_token,
            clientId: client_ID
        }
        console.log("postData_Logout",postData_Logout)
        const postlogout = await request
        .post('sso/logout')
        .send(postData_Logout)

        console.error("LOGOUT:",postlogout.body)
        // expect(postlogout.body.data.status).to.be.eq('SUCCESS');
        // expect(postlogout.body.data.statusCode).to.be.eq(200)
    }); 

    it.only('/get - MOBILE TICKET SCAN', async () => {
        const postData_TicketScan ={
            accessToken : access_token
        }
        // console.log("postData_Logout",postData_TicketScan)
        const postTicketScan = await request
        .get('ticket-scan/count')
        .send(postData_TicketScan)

        console.log("TicketSCANA:::::",postTicketScan)
        // expect(postData_TicketScan.body.status).to.be.eq('SUCCESS');
        // expect(postData_TicketScan.body.statusCode).to.be.eq(200)
    });
});
const supertest =require('supertest');
const { expect } = require('chai');
const request = supertest('https://api-stage.nylservices.net/sso/');
const Utils = require('../../../utils/readData');

describe('NYL SSO Mobile Registration', function ()  {
    let postData_Register, postData_Login, postData_Logout =null;
    var access_token ;
    
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
    it('/posts POST - MOBILE REGISTER', async () => {
        const postRes = await request
        .post('register')
        .send(postData_Register)

        console.log(postRes.body.data);
        expect(postRes.body.data.status).to.be.eq('SUCCESS');
        expect(postRes.body.data.statusCode).to.be.eq(200)
    }); 

    it('/post - MOBILE LOGIN', async () => {
        const postRes = await request
        .post('login')
        .send(postData_Login)

        access_token = postRes.body.data.AccessToken;
        expect(postRes.body.data.status).to.be.eq('SUCCESS');
        expect(postRes.body.data.statusCode).to.be.eq(200)
    }); 

    it('/post - MOBILE LOGOUT', async () => {
        // postData_Logout ={
        //     accessToken : access_token,
        //     clientId: client_id
        // }
        // postData_Logout ={
        //     accessToken : access_token,
        //     clientId: clientID
        // }

        // accessToken = access_token
        console.log("asasasa",postData_Logout)
        const postlogout = await request
        .post('logout')
        .send(postData_Logout)

        // access_token = postRes.body.data.AccessToken;
        console.log("LOGOUT:",postlogout.body.data)
        expect(postlogout.body.data.status).to.be.eq('SUCCESS');
        expect(postlogout.body.data.statusCode).to.be.eq(200)
    }); 
});
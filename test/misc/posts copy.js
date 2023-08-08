const CreateRandomUser = require('../helper/user_helper');
const supertest =require('supertest');
const { expect } = require('chai');
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = '2786dcaf18c1a06b0fdaaa02de64b87f9f4db0f71cf1f0e631eaab72ff5939ab';
describe('User Posts', async () => {
    let userId, postId;

    before(async ()=>{
        {
            userData = {
               email : `test-${Math.floor(Math.random()*1000)}@gmail.com`,
               name : 'ABC1a',
               status : 'active',
               gender : 'female'
           };           
               userRes=  await request
               .post('users')
               .set('Authorization',`Bearer ${TOKEN}`)
               .send(userData)
           
               userId =  await userRes.body.data.id;
        }
    })
    it('/posts POST', async () => {

        const postData = {
            user_id : userId,
            title : "My test Title",
            body : "My test blog"
        }
        const postRes = await request
        .post('posts')
        .set('Authorization',`Bearer ${TOKEN}`)
        .send(postData)
        postId = postRes.body.data.id
    
        expect(postRes.body.data).to.deep.include(postData)
        expect(postRes.body.code).to.be.equal(201)
    }); 
    it('GET /posts/:id', async() => {
        var res = await request
                .get(`posts/${postId}`)
                .set('Authorization',`Bearer ${TOKEN}`)
        await expect(res.body.data.id).to.be.eq(postId)
        console.log(res.body.code)
        await expect(res.body.code).to.be.eq(200)
        
    });
});
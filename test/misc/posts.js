const CreateRandomUser = require('../helper/user_helper');
const supertest =require('supertest');
const { expect } = require('chai');
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = '2786dcaf18c1a06b0fdaaa02de64b87f9f4db0f71cf1f0e631eaab72ff5939ab';
describe('User Posts', async () => {
    let userId, postId;

    before(async ()=>{
        userId = await CreateRandomUser.createUser();
    })
    describe('Create POSTS', () => {
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
            console.log("POSTID created",postId)
            console.log(postRes.body.data)
        });    
    });
    describe('Fetch POSTS', () => {
        it('GET /posts/:id', async() => {
            var res = await request
                    .get(`posts/${postId}`)
                    .set('Authorization',`Bearer ${TOKEN}`)
            await expect(res.body.data.id).to.be.eq(postId)
        });    
    }); 
    describe('Update POSTS', () => {
        it('PUT /posts/:id', async () => {
            const putData = {
                user_id : userId,
                title : "My test Title "+"updated",
                body : "My test blog "+"updated"
            } 
            const res = await request.put(`/posts/${postId}`)
                    .set("Authorization", `Bearer ${TOKEN}`)
                    .send(putData)
            console.log(res.body.data)
            await expect(res.body.data).to.deep.include(putData)
        });
    });

    describe('Delete POSTS', () => {
        it('DELETE /posts/:id', async () => {
            const res = await request.delete(`/posts/${postId}`)
                                     .set("Authorization", `Bearer ${TOKEN}`)
            console.log(res.body.data)
            expect (res.body.data).to.be.null;
        });
    });
    
});
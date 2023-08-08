import request from '../config/common'
require ('dotenv').config();
const TOKEN = process.env.USER_TOKEN // reading the token value from .env
class CreateRandomUser {
    
     userData = {
           email : `test-${Math.floor(Math.random()*1000)}@gmail.com`,
           name : 'ABC1a',
           status : 'active',
           gender : 'female'
       };   
       async createUser(){        
           const userRes=  await request
           .post('users')
           .set('Authorization',`Bearer ${TOKEN}`)
           .send(this.userData)
       
           const userId =  await userRes.body.data.id;
           console.log("Userid..",3997677)
           return userId;
    }}
    module.exports = new CreateRandomUser();
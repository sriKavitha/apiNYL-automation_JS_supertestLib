import nylqa from '../config/nylqa'
const supertest =require('supertest');
const request = supertest(nylqa.nylBaseURLGames);
export default request;
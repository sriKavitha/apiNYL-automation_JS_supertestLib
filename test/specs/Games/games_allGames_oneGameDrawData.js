const supertest =require('supertest');
const { expect } = require('chai');
const Utils = require('../../utils/readData');

var request = null
var apikey = null
var gamesArray = null;
var gamesIDArray = null;
var data = null;

describe('NYL Games', function ()  {
before (async ()=>
{
    // Read the datafile to get the environment name ex: qa/stage/production
    data = await Utils.readData();
    gamesArray = await data.games;
    gamesIDArray = await data.games_id;

    console.log("\n\n ======  << Tests are running in ENV: >>  ===== :" , "<<<", data.env.toUpperCase(), ">>>","\n\n");
    if (await data.env.toUpperCase() === "STAGE")
    {
        request = await supertest(data.stage_url)
        apikey = await data.stage_api_key
    }
    else if (await data.env.toUpperCase() === "QA")
    {
        request = await supertest(data.qa_url)
        apikey = await data.qa_api_key
    }
    else if (await data.env.toUpperCase() === "PRODUCTION")
    {
        request = await supertest(data.production_url)
        apikey = await data.production_api_key
    }
    else 
    { 
        throw new Error(`Please check the value of "ENVIRONMENT" in env.json file...>>>  ${await data.env.toUpperCase()}`);
    }
})

it('GET /all/draws', async () => {
    try{
        for(let i = 0; i < await gamesArray.length; i++) {
            
        const res = await request
            .get(`${gamesArray[i]}/draws`)
            .set('x-api-key',`${apikey}`)

            expect(res.body.data.status).to.be.eq('SUCCESS');
            expect(res.body.data.statusCode).to.be.eq(200);
            expect(res.body.data.gameId).to.be.eq(await `${gamesIDArray[i]}` );
            expect(res.body.data.draws).to.not.be.null;
            console.log(gamesArray[i].toUpperCase(), '==>', "\nStatus:", res.body.data.status, "\nStatus Code: ",res.body.data.statusCode, "\n" )
            console.log("Draw data for only one game: ", res.body.data.draws[1].results)
        }} catch(err) {
            throw ("Error...",err)
        }
});

});
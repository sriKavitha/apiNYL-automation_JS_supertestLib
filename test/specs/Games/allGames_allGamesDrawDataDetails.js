const supertest = require('supertest');
const { expect } = require('chai');
const ReadEnv = require('../../../utils/readEvn');
var request, data, apikey;
var gamesArray = [];
var gamesIDArray = [];
var data = null;

describe('NYL Games - Display detailed info for all games',  () => {
    before(async()=>
    {
        // Read env and its corresponding uri and apikey from .env file
        data = await ReadEnv.getSecrets();

        // assign the URI and apikey after reading the data from the file 
        request = supertest(data[1]);
        apikey=data[2]
        gamesArray = data[3].split(",")
        gamesIDArray = data[4].split(",")
    })

it.only('GET /all/draws', async () => {
    try{
        for(let i = 0; i < await gamesArray.length; i++) {
            console.log("Game: >>> ",gamesArray[i])
            const res = await request
                            .get(`${gamesArray[i]}/draws`)
                            .set('x-api-key',`${apikey}`)
            // console.log(res.body)
            for (var j=1;j < res.body.data.draws.length;j++)
            {
                console.log(`\t\t========== Draw data for ${j} Game ==========\t\t`)
                console.log(res.body.data.draws[j].results)
                expect(res.body.data.status).to.be.eq('SUCCESS');
                expect(res.body.data.statusCode).to.be.eq(200);
                // expect(res.body.data.gameId).to.be.eq('12');
                expect(res.body.data.draws).to.not.be.null;
            }
            console.log("\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n")
        } 
    }
catch(err) {
        throw ("Error...",err)
    }
});



    // it('GET /all/draws', async () => {
    //     try{
    //         for(let i = 0; i < await gamesArray.length; i++) {
    //             const res = await request
    //             //    .get(`${gamesArray[i]}/draws`)
    //                 .get('megamillions/draws')
    //                 .set('x-api-key',`${apikey}`)
    //                 for (var j=0;j < res.body.data.draws.length;j++)
    //                 // for (var j=0;j < 2;j++)
    //                         { console.log("asasasasa")
    //                             console.log(`===== Draw data for ${j} Game =====`)
    //                             console.log(res.body.data.draws[j].results)
    
    //                             expect(res.body.data.status).to.be.eq('SUCCESS');
    //                             expect(res.body.data.statusCode).to.be.eq(200);
    //                             expect(res.body.data.gameId).to.be.eq(await `${gamesIDArray[i]}` );
    //                             // expect(res.body.data.draws).to.not.be.null;
    //                             console.log(gamesArray[j], '==>', "\nStatus:", res.body.data.status, "\nStatus Code: ",res.body.data.statusCode, "\n" );
    //                         }
    //                         console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    //         }
    //     } catch(err) {
    //             throw ("Error...",err)
    //         }
    // });
    
   });

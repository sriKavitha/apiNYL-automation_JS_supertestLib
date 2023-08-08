const fs = require("node:fs/promises");
class Utils 
{
  // read jsonfile
  async readData() 
  {
      const data = await fs.readFile("./data/env.json");
      var userData = [];
      try {
         userData = JSON.parse(data);
      } catch (error) {
      console.log("File not found", error);
    }
    console.log("USER DATA...", userData)
    if ((userData.env)=='qa')
    {
      return [userData.env, userData.qa_url,userData.qa_api_key];
    }
    else if ((userData.env)=='stage')
    {
      return [userData.env, userData.stage_url,userData.stage_api_key];
    }
    else if ((userData.env)=='production')
    {
      return [userData.env, userData.production_url,userData.production_api_key];
    }
    {
      console.log("Invalid ENVIRONMENT value in env.json file")
    }
    
  }
}
module.exports = new Utils();
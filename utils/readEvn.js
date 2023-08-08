require('dotenv').config()
class ReadEnv
{
  async getSecrets()
  {
    const env = process.env.ENV 
    if (env.toUpperCase()=='QA')
    {
      return [process.env.ENV, process.env.QA_URL,process.env.QA_API_KEY,process.env.GAMES, process.env.GAMES_ID];
    }
    else if (env.toUpperCase()=="STAGE")
    {
      return [process.env.ENV, process.env.STAGE_URL,process.env.STAGE_API_KEY, process.env.GAMES, process.env.GAMES_ID];
    }
    else if (env.toUpperCase()=="PRODUCTION")
    {
      return [process.env.ENV, process.env.PRODUCTION_URL,process.env.PRODUCTION_API_KEY, process.env.GAMES, process.env.GAMES_ID];
    }
    else
    {
      console.log("Invalid value for 'ENV' in '.env' file.\nEnv can only be PRODUCTION/STAGE/QA")
    }
  }
}
module.exports = new ReadEnv(); 

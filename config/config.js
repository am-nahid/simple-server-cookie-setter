const mongoose = require('mongoose')
mongoose.set("strictQuery",true)
const dotenv = require("dotenv")

dotenv.config()
const atlasUrl = process.env.atlas_url


async function connectToDb(){
    try{
        await mongoose.connect(atlasUrl)
        console.log("server connected to DB");
    }catch(err){
        console.log(err, " Error in making contact");
    }
}

module.exports = connectToDb
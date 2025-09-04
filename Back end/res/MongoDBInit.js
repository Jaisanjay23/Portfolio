const mongodb = require("mongodb")

async function ConfigureMongoDB(rq,rs,next) {
    try{
        let mongo = new mongodb.MongoClient(process.env.MONGODB_ATLAS_URL)
        let db = (await mongo.connect()).db("Portfolio")
        
        rq.db = db;
        rq.orders = db.collection("Orders")
    }
    catch(e){
        console.log(e.message)
    }

    next()
}

module.exports = {
    ConfigureMongoDB
}
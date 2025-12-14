const express = require("express")
const cors = require("cors")
const filesys = require("fs")
const application = express()

const {ConfigureMongoDB} = require("./res/MongoDBInit.js")
const HirerAPIV1 = require("./Hirer API/HirerAPIv1.js")
const DeveloperAPIV1 = require("./Developer API/DeveloperAPIv1.js")

// Initialising .env file to proccess.env property
require("dotenv").config({path:"./res/.env"})

// Middlewares
application.use(cors())
application.use(express.json())
application.use(express.static("./Portfolio"))
application.use(express.static("./Admin panel"))
application.use(ConfigureMongoDB)
application.use(DeveloperAPIV1.Authorise)

// Portfolio (Vuejs application)
application.get("/",(rq,rs)=>{
    rs.sendFile("./index.html")
})

// Admin Panel (ReactJS application)
application.get("/alogin",async(rq,rs)=>{
    let file = await filesys.promises.readFile("./Admin panel/index.html")
    rs.setHeader("Content-Type","text/html")
    rs.send(file.toString())
})

// Hirer REST API
application.post("/order",HirerAPIV1.Order)
application.delete("/cancelorder",HirerAPIV1.CancelOrder)
application.get("/track",HirerAPIV1.Track)
application.post("/mail",HirerAPIV1.sendMailToDeveloper)

// Developer REST API
application.post("/login",DeveloperAPIV1.Login)
application.post("/takeorder",DeveloperAPIV1.TakeOrder)
application.post("/posttrack",DeveloperAPIV1.PostTrack)
application.post("/deliver",DeveloperAPIV1.Deliver)
application.put("/updatetrack",DeveloperAPIV1.UpdateTrack)
application.delete("/dcancelorder",DeveloperAPIV1.CancelOrder)
application.get("/orders",DeveloperAPIV1.Orders)
application.get("/ordertracks",DeveloperAPIV1.OrderTracks)

// Starting server
application.listen(process.env.PORT)


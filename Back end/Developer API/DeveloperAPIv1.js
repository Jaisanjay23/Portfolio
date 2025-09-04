const EmailManager = require("../res/EmailManager.js")
const moment = require("moment")
const jwt = require("jsonwebtoken")

// Only use this in Middleware
async function Authorise(rq,rs,nxt){
    try{
        let isNeedToAuthourise = false
        for(let req of ["takeorder","posttrack","deliver","updatetrack","dcancelorder","orders","ordertracks"]){
            if(rq.url.includes(req)){
                isNeedToAuthourise = true
                break
            }
        }
        if(isNeedToAuthourise){
            try{
                const JWT = rq.headers.authorization.split(" ")[1]  // Bearer token
                jwt.verify(JWT,process.env.JWT_SECRET_KEY)
                nxt()
            }
            catch(e){
                if(e.message === "jwt expired"){
                    rs.send({data:false}) // EXPIRED
                }
                else{
                    throw new Error("ERROR")
                }
            }
        }
        else{
            nxt()
        }
    }
    catch(e){
        rs.send({data:false})
    }
}

// Authentication
async function Login(rq,rs){
    try{
        const tid = await rq.db.collection("Profile").findOne({Key:rq.body.key}) 
        
        if(tid != null){
            try{
                const token = jwt.sign({},process.env.JWT_SECRET_KEY,{expiresIn:"30m"})
                rs.send({data:token})
            }
            catch(e){
                throw new Error("ERROR")
            }
        }
        else{
            rs.send({data:false})
        }
    }
    catch(e){
       
        rs.send({data:"ERROR"})
    }
} 

async function TakeOrder(rq,rs){
    try{
        let Order = await rq.orders.findOne({OrderID:rq.body.ord_id})
        let isUpdated = (await rq.orders.updateOne({OrderID:rq.body.ord_id},{
            $set:{
                Taken:true
            }
        })).modifiedCount === 1
    
        if(isUpdated){
            rs.send({data:true})
            EmailManager.sendEmail(rq.body.ord_id,"ORDER_TAKEN_TEMPLATE",Order.Email,"Order Information")
        }
        else{
            throw new Error("ERROR")
        }
    }
    catch(e){
        rs.send({data:false})
    }
} 

async function PostTrack(rq,rs){
    try{
        let Order = await rq.orders.findOne({OrderID:rq.body.ord_id})
        let ID = require("cuid")()
    
        if(Order !== null){
            let tracks = await rq.db.collection(rq.body.ord_id)
            let date = moment().format("DD.MM.YYYY")
            let info = {
                date:date,
                message:rq.body.msg,
                id:ID
            }
            
            try{
                await tracks.insertOne(info)
                rs.send({data:true})
            }
            catch(e){
                rs.send({data:false})
            }
        }
        else{
            rs.send({data:"ORDER_NOT_EXISTS"})
        }
    }
    catch(e){
        rs.send({data:false})
    }
    
}

async function Deliver(rq,rs) {
    try{
        let Order = await rq.orders.findOne({OrderID:rq.body.ord_id})
    
        if(Order !== null){
            let isUpdated = (await rq.orders.updateOne({OrderID:rq.body.ord_id},{
                $set:{
                    Delivered:true,
                    deliveredOn:moment().format("DD.MM.YYYY")
                }
            })).modifiedCount === 1
    
            rs.send({data:isUpdated})
    
            if(isUpdated){
                EmailManager.sendEmail(rq.body.ord_id,"ORDER_DELIVERED_TEMPLATE",Order.Email,"Order Information") 
            }
        }
        else{
            rs.send({data:"ORDER_NOT_EXISTS"})
        }
    }
    catch(e){
        rs.send({data:false})
    }
}

async function UpdateTrack(rq,rs) {
    try{
        let Order = await rq.orders.findOne({OrderID:rq.body.ord_id})
    
        if(Order !== null){
            let tracks = rq.db.collection(rq.body.ord_id)
            let isUpdated = (await tracks.updateOne({id:rq.body.tid},{
                $set:{
                    message:rq.body.msg
                }
            })).modifiedCount === 1
    
            rs.send({data:isUpdated})
        }
        else{
            rs.send({data:"ORDER_NOT_EXISTS"})
        }
    }
    catch(e){
        rs.send({data:false})
    }
}

async function CancelOrder(rq,rs){
    try{
        let Order = await rq.orders.findOne({OrderID:rq.body.ord_id})
        let isDeleted = (await rq.orders.deleteOne({OrderID:rq.body.ord_id})).deletedCount == 1
    
        if(isDeleted){
            let IsTracksDeleted = await rq.db.collection(rq.body.ord_id).drop()
            rs.send({data:IsTracksDeleted})
            EmailManager.sendEmail(rq.body.ord_id,"ORDER_CANCELLED_TEMPLATE",Order.Email,"Order Information")
            EmailManager.sendEmail(rq.body.ord_id,"CANCEL_ORDER_INFO",process.env.ADMIN_EMAIL,"Order Information")
        }
        else{
            rs.send({data:"ORDER_NOT_EXIST"})
        }
    }
    catch(e){
        rs.send({data:false})
    }
} 

async function Orders(rq,rs) {
    try{
        let Orders = (await rq.orders.find({},{projection:{_id:0}}).toArray())
        rs.send({data:Orders.length != 0 ? Orders[0]:false})
    }
    catch(e){
        rs.send({data:"ERROR"})
    }
}

async function OrderTracks(rq,rs) {
    try{
        let Order = await rq.orders.findOne({OrderID:rq.query.ord_id})
        let Tracks = await rq.db.collection(rq.query.ord_id).find().toArray()
        let tracks = {
            Confirmed:Order.Taken,
            Delivered:Order.Delivered,
            Stages:Tracks
        } 
        
        rs.send({data:tracks})
    }
    catch(e){
        rs.send({data:false})
    }
}

module.exports = {
    TakeOrder,PostTrack,Deliver,UpdateTrack,CancelOrder,Orders,OrderTracks,Login,Authorise
}
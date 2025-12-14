const EmailManager = require("../res/EmailManager.js")
const moment = require("moment")

async function Order(rq,rs){
    let datum = rq.body
    let date = moment().format("DD.MM.YYYY")
    const ID = require("cuid")().substring(0,8)

    let order_details = {
        OrderID:ID,
        Date:date,
        HirerName:datum.hir_nm,
        Email:datum.email,
        MobileNumber:datum.ph_nm,
        UserType:datum.usr_type,
        CompanyName: Object.keys(datum).includes("comp_nm") ? datum.comp_nm : null,
        ProjectName:datum.proj_nm,
        Country:datum.country,
        AppType:datum.app_type,
        Features:datum.features,
        Taken:false,
        Delivered:false
    }

    try{
       let IsAlreadyProjectGoing = (await rq.orders.find().toArray()).length == 0
       
       if(IsAlreadyProjectGoing){
          await rq.orders.insertOne(order_details)
          await rq.db.createCollection(ID)
          rs.send({data:ID})
          EmailManager.sendEmail(ID,"ORDER_ID_TEMPLATE",datum.email,"Order Information")
          EmailManager.sendEmail(ID,"RECIEVE_ORDER",process.env.ADMIN_EMAIL,"Order Information")
       }
       else{
        rs.send({data:"ALREADY_ORDERED"})
       }
    }
    catch(e){
       rs.send({data:"ERROR"})
    }
}

async function CancelOrder(rq,rs){
    let Order = await rq.orders.findOne({OrderID:rq.body.ord_id})
        let IsDeleted = (await rq.orders.deleteOne({OrderID:rq.body.ord_id})).deletedCount == 1
        let IsTracksDeleted = await rq.db.collection(rq.body.ord_id).drop()

        if(IsDeleted && IsTracksDeleted){
            rs.send({data:true})
            EmailManager.sendEmail(rq.body.ord_id,"ORDER_CANCELLED_TEMPLATE",Order.Email,"Order cancelled successfully !")
            EmailManager.sendEmail(rq.body.ord_id,"CANCEL_ORDER_INFO",process.env.ADMIN_EMAIL,"Order was cancelled !")
        }
        else{
            rs.send({data:false})
        }
}

async function Track(rq,rs){
    try{
        let tracks = await rq.db.collection(rq.query.ord_id).find({}).toArray()
        let Order = await rq.orders.findOne({OrderID:rq.query.ord_id})
      
        if(Order != null){
            let Tracks = {
                OrderedOn:Order.Date,
                Accepted:Order.Taken,
                Tracks:tracks,
                Delivered:Order.Delivered
            }
            
            rs.send({data:Tracks})
        }
        else{
            rs.send({data:false})
        }
    }
    catch(e){
       
    }
}

async function sendMailToDeveloper(rq,rs) {
    try{
        let {subject,msg,email,name} = rq.body
        await EmailManager.sendMail(subject,msg,email,name)
        rs.send({data:true})
    }
    catch(e){
        rs.send({data:false})
    }
}
module.exports = {
    Order,CancelOrder,Track,sendMailToDeveloper
}
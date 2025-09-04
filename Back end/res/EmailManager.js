const nodemailer = require("nodemailer")
const moment = require("moment")

async function sendEmail(orderid,purpose,reciever,subject){
    
    let transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.ADMIN_EMAIL,
            pass:process.env.GMAIL_APP_PASS_KEY
        }
    })

    let message
    
    switch(purpose){
        case "ORDER_ID_TEMPLATE":
            message = OrderID_Template(orderid)
            break;
        case "ORDER_TAKEN_TEMPLATE":
            message = OrderTaken_Template(orderid)
            break;
        case "ORDER_CANCELLED_TEMPLATE":
            message = OrderCancelledTemplate(orderid)
            break;
        case "ORDER_DELIVERED_TEMPLATE":
            message = OrderDeliveredTemplate(orderid)
            break;
        case "RECIEVE_ORDER":
            message = RecieveOrder(orderid)
            break
        case "CANCEL_ORDER_INFO":
            message = CancelOrderInfo(orderid)                    
    }
   try{
        await transport.sendMail({
          from:process.env.ADMIN_EMAIL,
          to:reciever,
          subject:subject,
          html:message
        })
  }
    catch(e){
        console.log(e.message)
   }
     
}

// for Hirers
function OrderID_Template(orderID){
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="
    border-radius: 7px;
    background-color: rgba(1, 1, 102, 0.877);
    padding: 15px;
    text-align: center;">
        <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.8rem;
        color: white;
        margin: 30px 0px 15px 0px;">
        NodeNexus</h4>
        <b style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.4rem;
        display: block;
        text-align: center;
        color: rgb(0, 247, 255);
        font-weight: 500;">
            You order was successfully placed and Your Order ID is</b>
        <b style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.7rem;
        display: block;
        text-align: center;
        color: rgb(0, 204, 109);
        margin-top: 30px;
        font-weight: 500;">${orderID}</b>

        <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1rem;
        display: block;
        text-align: center;
        color: rgb(0, 145, 255);
        font-weight: 500;">
       
       Keep this order ID very safely. Becuase it is a proof for this project is yours only. It will be verified when project was completed 
         and ready for deliver to you. 
         You can track your order in the order tracking section.
    </p>
    </div>
</body>
</html>
    `
}

function OrderTaken_Template(orderID){
     let date = moment().format("DD.MM.YYYY")
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="
    border-radius: 7px;
    background-color: rgba(1, 1, 102, 0.877);
    padding: 15px;
    text-align: center;">
        <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.8rem;
        color: white;
        margin: 30px 0px 15px 0px;">
        NodeNexus</h4>
        <b style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.4rem;
        display: block;
        text-align: center;
        color: rgb(0, 247, 255);
        font-weight: 500;
        margin-bottom: 30px;
        ">
            You order <span style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:1.4rem;
            text-align: center;
            color: rgb(255, 0, 51);
            font-weight: 500;">${orderID}</span> was started working on ${date} and You can track proggress in NodeNexus
            </b>
    </div>
</body>
</html>
    `
}

function OrderCancelledTemplate(orderID){
     let date = moment().format("DD.MM.YYYY")
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="
    border-radius: 7px;
    background-color: rgba(1, 1, 102, 0.877);
    padding: 15px;
    text-align: center;">
        <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.8rem;
        color: white;
        margin: 30px 0px 15px 0px;">
        NodeNexus</h4>
        <b style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.4rem;
        display: block;
        text-align: center;
        color: rgb(0, 247, 255);
        font-weight: 500;
        margin-bottom: 30px;
        ">
            You order <span style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:1.4rem;
            text-align: center;
            color: rgb(30, 255, 0);
            font-weight: 500;">${orderID}</span> was 
            
            <span style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:1.4rem;
            text-align: center;
            color: rgb(255, 0, 51);
            font-weight: 500;">CANCELLED</span> on ${date}
            </b>
    </div>
</body>
</html>
    `
}

function OrderDeliveredTemplate(orderID){
     let date = moment().format("DD.MM.YYYY")
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="
    border-radius: 7px;
    background-color: rgba(1, 1, 102, 0.877);
    padding: 15px;
    text-align: center;">
        <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.8rem;
        color: white;
        margin: 30px 0px 15px 0px;">
        NodeNexus</h4>
        <b style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.4rem;
        display: block;
        text-align: center;
        color: rgb(0, 247, 255);
        font-weight: 500;
        margin-bottom: 30px;
        ">
            You order  <span style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:1.4rem;
            text-align: center;
            color: rgb(255, 196, 0);
            font-weight: 500;">${orderID}</span> was 
            
            <span style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:1.4rem;
            text-align: center;
            color: rgb(0, 255, 30);
            font-weight: 500;">DELIVERED on ${date}</span> 
            </b>
    </div>
</body>
</html>
    `
}

// for Developer

function RecieveOrder(orderID){
     let date = moment().format("DD.MM.YYYY")
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="
    border-radius: 7px;
    background-color: rgba(1, 1, 102, 0.877);
    padding: 15px;
    text-align: center;">
        <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.8rem;
        color: white;
        margin: 30px 0px 15px 0px;">
        NodeNexus</h4>
        <b style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.4rem;
        display: block;
        text-align: center;
        color: rgb(0, 206, 107);
        font-weight: 500;
        margin-bottom: 30px;
        ">
            You recieved one order(
            
             <span style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:1.4rem;
            text-align: center;
            color: rgb(0, 255, 242);
            font-weight: 500;">${orderID}</span>  ) on ${date}!
            </b>
    </div>
</body>
</html>
    `
}

function CancelOrderInfo(orderID){
     let date = moment().format("DD.MM.YYYY")
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="
    border-radius: 7px;
    background-color: rgba(1, 1, 102, 0.877);
    padding: 15px;
    text-align: center;">
        <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.8rem;
        color: white;
        margin: 30px 0px 15px 0px;">
        NodeNexus</h4>
        <b style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:1.4rem;
        display: block;
        text-align: center;
        color: rgb(0, 206, 107);
        font-weight: 500;
        margin-bottom: 30px;
        ">
             order(
            
             <span style="
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size:1.4rem;
            text-align: center;
            color: rgb(0, 255, 242);
            font-weight: 500;">${orderID}</span>  ) was cancelled on ${date}!
            </b>
    </div>
</body>
</html>
    `
}

async function sendMail(subject,message,email,name) {
        let transport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.ADMIN_EMAIL,
                pass:process.env.GMAIL_APP_PASS_KEY
            }
        })
        await transport.sendMail({
            from:process.env.ADMIN_EMAIL,
            to:process.env.ADMIN_EMAIL,
            subject:subject + "-" + email,
            text:name + ":" + message
          })
    }
    

module.exports = {
    sendEmail,sendMail
}
// Configuring environment variables 

fetch("https://sample-3961a-default-rtdb.firebaseio.com/Portfolio.json").then((v)=>{
  v.json().then((v)=>{
     window.SERVER_ORIGIN = v.SERVER_ORIGIN
  })
})
// for Hirers
async function Order(details){
    console.log(window.SERVER_ORIGIN)
    let result = await(await fetch(window.SERVER_ORIGIN + "/order",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(details) 
    })).json()

    return result
}

async function CancelOrder(orderid){
    let result = await(await fetch(SERVER_ORIGIN + "/cancelorder",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            ord_id:orderid
        })
    })).json()

    return result
}

async function TrackOrder(orderid){
    let result = await(await fetch(SERVER_ORIGIN + "/track?ord_id=" + orderid)).json()

    return result
}

// for  Admin API 
async function Login(key){
    let result = await(await fetch(SERVER_ORIGIN + "/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            key:key
        })
    })).json()

    return result
}
async function TakeOrder(orderid,token){
    let result = await(await fetch(SERVER_ORIGIN + "/takeorder",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + token
        },
        body:JSON.stringify({
            ord_id:orderid
        })
    })).json()

    return result
}

async function PostTrack(orderid,msg,token){
    let result = await(await fetch(SERVER_ORIGIN + "/posttrack",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + token
        },
        body:JSON.stringify({
            ord_id:orderid,
            msg:msg
        })
    })).json()

    return result
}

async function DeliverOrder(orderid,token){
    let result = await(await fetch(SERVER_ORIGIN + "/deliver",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + token
        },
        body:JSON.stringify({
            ord_id:orderid
        })
    })).json()

    return result
}

async function UpdateTrack(orderid,tid,token){
    let result = await(await fetch(SERVER_ORIGIN + "/updatetrack",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + token
        },
        body:JSON.stringify({
            ord_id:orderid,
            tid:tid
        })
    })).json()

    return result
}

async function sendMail(msg,sub,email,name){
    let result = await(await fetch(SERVER_ORIGIN + "/mail",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            msg:msg,
            subject:sub,
            name:name,
            email:email
        })
    })).json()

    return result
}
async function DCancelOrder(orderid,token){
    let result = await(await fetch(SERVER_ORIGIN + "/dcancelorder",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + token
        },
        body:JSON.stringify({
            ord_id:orderid
        })
    })).json()

    return result
}

async function Orders(token){
    let result = await(await fetch(SERVER_ORIGIN + "/orders",{
        headers:{
            Authorization:"Bearer " + token
        }
    })).json()

    return result
}

async function OrderTracks(orderid,token){
    let result = await(await fetch(SERVER_ORIGIN + "/ordertracks?ord_id=" + orderid,{
        headers:{
            Authorization:"Bearer " + token
        }
    })).json()

    return result
}

export {
    Order,TrackOrder,CancelOrder,Login,TakeOrder,UpdateTrack,PostTrack,OrderTracks,Orders,DCancelOrder,DeliverOrder,
    sendMail
}
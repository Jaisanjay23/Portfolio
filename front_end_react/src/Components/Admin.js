/* eslint-disable react-hooks/exhaustive-deps */
import "../css/admin.css"


import * as Nodenexus from "../res/NodeNexusAPIv1.js"
import Track from "../Components/Track.js"
import { useEffect, useRef, useState } from "react"

export default function Admin({Message}){
     
    let [tracks,settracks] = useState([])
    let [opened,setopen] = useState(false)
    let [taken,updatetaken] = useState(false)
    let [delivered,updatedelivered] = useState(false)
    let [details,setdetails] = useState(null)
    const ADMIN_TOKEN = sessionStorage.getItem("admintoken")

    let fetchorder = async()=>{
      let orderinfo = (await Nodenexus.Orders(ADMIN_TOKEN)).data
      if(orderinfo === "EXPIRED"){
        Message("Session expired !")
      }
      else if(orderinfo === "ERROR"){
        Message("Something went wrong !")
      }
      else{
        if(orderinfo.length !== 0){
          updatetaken(orderinfo.Taken)
          updatedelivered(orderinfo.Delivered)
        }
        setdetails(orderinfo !== false ? orderinfo : null)
      }
    }
    
    let OrderAction = async function (action) {
      // eslint-disable-next-line default-case
      switch(action){
        case "TAKE":
          let isTaken = (await Nodenexus.TakeOrder(details.OrderID,ADMIN_TOKEN)).data
          if(isTaken){
             updatetaken(isTaken)
          }
          else{
             Message("Something went wrong !")
          }
          break
        case "CANCEL":
          let isCancelled = (await Nodenexus.DCancelOrder(details.OrderID,ADMIN_TOKEN)).data
          if(isCancelled){
             window.location.pathname = "/alogin"
          }
          else{
             Message("Something went wrong !")
          }
          break
        case "DELIVER":
          let isDelivered = (await Nodenexus.DeliverOrder(details.OrderID,ADMIN_TOKEN)).data
          if(isDelivered){
             updatedelivered(true)
          }
          else{
             Message("Something went wrong !")
          }  
          break
        case "FETCH_TRACKS":
          let rtracks = await Nodenexus.OrderTracks(details.OrderID,ADMIN_TOKEN)
          settracks(rtracks.data.Stages)
          updatedelivered(rtracks.data.Confirmed)
          updatetaken(rtracks.data.Delivered)
          break
     
      }
    }

    useEffect(()=>{
      fetchorder()
    },[])
    useEffect(()=>{
      if(details !== null){
        OrderAction("FETCH_TRACKS")
      }
    },[details])

    let Takeorder = async ()=>{OrderAction("TAKE")}
    let Cancelorder = async ()=>{OrderAction("CANCEL")}
    let Deliverorder = async ()=>{OrderAction("DELIVER")}
    let Opentracks = ()=>{setopen(!opened)}

    return <div className="admh">
    <div className="adm">
      <b>Orders</b>
      {details === null && <p>No orders</p>}
    </div> 
    
    {details != null && <div className="ordv" >
        <b></b>
        <button onClick={taken ? Cancelorder:Takeorder}>{taken ? "Cancel order":"Take order"}</button>
        <button onClick={!delivered ? Deliverorder :()=>{} } disabled={delivered}>{delivered ? "Delivered" :"Deliver" }</button>
        <button onClick={Opentracks}>Tracks</button>
    </div>}
    
    {details !== null && <div className="details">
       {Object.entries(details).map((v)=>{
        if(v[0] !== "Taken" && v[0] !== "Delivered"){
          return <div className="dt">
          <b>{v[0]}</b>
          <b>{v[1]}</b>
         </div>
        }
      })}  
      </div>
        }
  
    {opened && <Track tracks={tracks} updatetracks={settracks} Message={Message} orderid={details.OrderID}/>}
</div>
}
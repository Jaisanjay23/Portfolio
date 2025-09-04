import { useState } from "react"
import {PostTrack,UpdateTrack,OrderTracks} from "../res/NodeNexusAPIv1.js"
import "../css/track.css"

export default function Track({tracks,updatetracks,orderid,Message}){
    
    let [Isnewtrack,setnewtrack] = useState(false)

    let posttrack = async (e)=>{
      let msg = e.currentTarget.parentElement.children[1].innerText
      let posted = await PostTrack(orderid,msg,sessionStorage.getItem("admintoken"))
      if(posted.data === "ORDER_NOT_EXISTS"){
        Message("No order found !")
      }
      else if(posted.data === false){
        Message("Something went wrong !")
      }
      else{
        let rtracks = await OrderTracks(orderid,sessionStorage.getItem("admintoken"))
        updatetracks(rtracks.data.Stages)
      }
    }

    let updatetrack = async (e)=>{
      let tid = e.currentTarget.getAttribute("tid") 
      let msg = prompt("Enter new message :")
      if(msg !== null){
        let posted = await UpdateTrack(orderid,tid,msg,sessionStorage.getItem("admintoken"))
        if(posted.data === "ORDER_NOT_EXISTS"){
          Message("No order found !")
        }
        else if(posted.data === false){
          Message("Something went wrong !")
        }
        else{
          let rtracks = await OrderTracks(orderid,sessionStorage.getItem("admintoken"))
          updatetracks(rtracks.data.Stages)
        }
      }
      
    }
    
    let ToggleNewTrack = ()=>{
      setnewtrack(true)
    }
    let UnToggleTrack = ()=>{
      setnewtrack(false)
    }
    
    return <div className="trkv">
    <button onClick={ToggleNewTrack}>Post track</button>

    {Isnewtrack && <div className="trk" >
       <b>On __Date will replaced by server__</b>
       <p contenteditable="true">message</p>
       <button style={{backroundColor:"blue"}} onClick={posttrack}>SAVE</button>
       <button style={{backroundColor:"blue"}} onClick={UnToggleTrack}>CANCEL</button>
    </div>}

    {tracks.map((v,i)=><div className="trk" key={v.id} tid={v.id} onClick={updatetrack}>
       <b>On {v.date}</b>
       <p contenteditable="true">{v.message}</p>
    </div>)}
  </div>
}
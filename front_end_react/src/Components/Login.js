import { useRef } from "react"
import { useNavigate } from "react-router"

import "../css/login.css"
import {Login as login} from "../res/NodeNexusAPIv1.js"

async function LogintoAdminPanel(key,Message,Goto){
    if(key.length != 0){
      let token = (await login(key)).data
     
      if(token === "ERROR"){
        Message("Authentication error !")
      }
      else if(token === false){
        Message("Incorrect key !")
      }
      else {
        sessionStorage.setItem("admintoken",token)
        Goto("/admin")
      }
    } 
    else{
      Message("Please enter admin key !")
    }
}
export default function Login(params){
    
    let key = useRef()
    let Goto = useNavigate()

    return (
    
    <div className="logh">
    <div className="log">
      <b>Admin Room</b>
      <input type="text" placeholder="Admin entry key" ref={key}/>
      <button onClick={()=>{LogintoAdminPanel(key.current.value,params.Message,Goto)}}>LOGIN</button>
    </div>  

</div>)
}
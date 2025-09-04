import { Router,BrowserRouter,Routes,Route } from "react-router";
import Admin from "./Components/Admin.js"
import Login from "./Components/Login.js"
import Message from "./Components/Msg.js"
import { useEffect, useState } from "react";


function App() { 
  let [message,setmessage] = useState("null")
  let showmessage = (msg)=>{
    setmessage(msg)
    setTimeout(()=>{
      setmessage("null")
    },3000)
  }
  
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/alogin" element={<Login Message={showmessage}/>}/>
        <Route path="/admin" element={<Admin Message={showmessage}/>}/>
       </Routes>
      {message != "null" && <Message msg={message}/>}
    </BrowserRouter>
  );
}

export default App;



<template>
    <div class="logh">
        <div class="log">
          <b>Admin Room</b>
          <input type="text" placeholder="Admin entry key" ref="akey">
          <button @click="login">LOGIN</button>
        </div>  

        <Message :msg="msg" v-if="msg != 'null'"/>
    </div>
</template>


<script setup>
import Message from "../components/Message.vue";
import { ref } from "vue"
import { useRouter } from "vue-router";
import * as NodeNexus from "../res/NodeNexusAPIv1.js" 

//let router = useRouter()
let msg = ref("null")
let akey = ref(null)

let showmessage = function(mssg){
   msg.value = mssg
   setTimeout(()=>{msg.value = "null"},3000)
}
async function login(){
            console.log(akey.value.value)
    if(akey.value.value !== ""){
                
        let token = await NodeNexus.Login(akey.value.value)
        if(token.data === false){
            showmessage("Admin key not found !")
        }
        else if(token.data === "ERROR"){
            showmessage("Authentication error !")
        }
        else{
            sessionStorage.setItem("adminkey",token.data)
           // router.push("/admin")
        }
    }
    else{
        showmessage("Please enter admin key !")
    }      
}
</script>

<style scoped>
@import url('../res/Roboto.css');

.logh{
    height: 100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:rgb(14, 3, 65);
}
.logh .log{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
}

.logh .log b{
    font-family: rob-bld;
    color: white;
    font-size: 4rem;
    margin-top: 40px;
}

.logh .log input{
    font-family: rob-bld;
    color: rgb(29, 29, 29);
    font-size: 1.8rem;
    margin-top: 40px;
    border: none;
    outline: none;
    padding: 20px;
    border-radius: 15px;
}
.logh .log input::placeholder{
    color: rgba(71, 71, 71, 0.532);
}

.logh .log button{
    font-family: rob-bld;
    color: rgb(255, 255, 255);
    font-size: 1.8rem;
    margin-top: 40px;
    border: none;
    outline: none;
    padding: 15px;
    border-radius: 15px;
    background-color: rgb(0, 159, 199);
    width: inherit;
}
.logh .log button:hover{
    background-color: rgb(0, 75, 140);
}
</style>
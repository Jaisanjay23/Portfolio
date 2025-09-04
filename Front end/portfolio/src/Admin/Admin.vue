<template>
    <div class="admh">
        <div class="adm">
          <b>Orders</b>
          <p v-if="orders.length == 0">No orders</p>
          <div class="ord" v-for="ord in orders">
            <b>{{ord.ordername}}</b>
            <b @click="opened = true">OPEN</b>
          </div>

        </div> 
        
        <div class="ordv" v-if="opened">
            <b>{{orderid}}</b>
            <button @click="takenfn">{{!taken ? 'Take order':'Cancel order'}}</button>
            <button :disabled="delivered" @click="deliver">{{!delivered ? 'Deliver':'Delivered'}}</button>
            <button @click="track = true">Tracks</button>
        </div>

        <Tracking v-if="track" @msg="showmessage"/>
        <Message v-if="msg != 'null'" :msg="msg"/>
    </div>
</template>

<script setup>
import Tracking from "./Track.vue"

import Message from "../components/Message.vue"
import { onMounted, ref } from "vue"
import * as NodeNexus from "../res/NodeNexusAPIv1.js" 


let orders = ref([])

let taken = ref(false)
let takenfn = ref(takeorder)
let delivered = ref(false)

let opened = ref(false)
let track = ref(false)

let msg = ref("null")

let orderid = ref("")
let token = sessionStorage.getItem("adminkey")

let showmessage = function(mssg){
   msg.value = mssg
   setTimeout(()=>{msg.value = "null"},3000)
}

async function takeorder(){
  console.log(8)
  let takenr = await NodeNexus.TakeOrder(orderid.value,token)
  if(taken){
      taken.value = takenr.data
      takenfn.value = cancelorder
  }
  else{
      showmessage("No order found !")
  }
}

async function cancelorder(){
  let cancelr = await NodeNexus.DCancelOrder(orderid.value,token)
  if(cancelr === "ORDER_NOT_EXIST"){
    showmessage("No order found !")
  }
  else if(cancelr.data === false){
    showmessage("Something went wrong !")
  }
  else{
    location.reload()
  }
}

async function deliver(){
  let deliverr = await NodeNexus.DeliverOrder(orderid.value,token)
  if(deliverr === "ORDER_NOT_EXIST"){
    showmessage("No order found !")
  }
  else if(deliverr.data === false){
    showmessage("Something went wrong !")
  }
  else{
    delivered.value = deliverr.data
  }
}
onMounted(async()=>{
  let order = (await NodeNexus.Orders(sessionStorage.getItem("adminkey"))).data
  if(order.length == 1){
    let takenorder = order[0]
    orders.value.push({ordername:takenorder.HirerName + ".On : " + takenorder.Date})
    orderid.value = takenorder.OrderID
  }
  else if(order.data == "ERROR"){
    alert("Token expired !")
  }
})
</script>


<style scoped>
@import url('../res//Roboto.css');

  .admh{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: rgb(0, 0, 62);
  }
  .admh .adm{
    width: 60%;
    margin-top: 25px;
    border-radius: 10px;
    margin: 15px;
    background-color: transparent;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .admh .adm b{
    font-family: rob-bld;
    color: rgb(255, 255, 255);
    font-size: 2rem;
    text-align: center;
  }
  .admh .adm p{
    font-family: rob-lt;
    color: rgb(182, 182, 182);
    font-size: 1.5rem;
    text-align: center;
  }
  .admh .adm .ord{
    display: flex;
    justify-content: space-between;
  }
  .admh .adm .ord b{
    margin-top: 15px;
    font-size: 1rem;
    text-align: left;
    color: rgb(0, 218, 87);
    padding: 10px;
    border-radius: 10px;
    transition: background-color 0.5s;
  }

  .admh .adm .ord b:nth-child(2){
    cursor: pointer;
    color: rgb(0, 229, 255);
  }
  .admh .adm .ord b:nth-child(2):hover{
     background-color: rgba(238, 238, 238, 0.127);
  }

  .admh .ordv b{
    margin-top: 15px;
    font-size: 1.5rem;
    text-align: left;
    color: rgb(0, 145, 248);
    margin-right: 15px;
    font-family: rob-bld;
  }
  .admh .ordv button{
    border: none;
    margin-top: 15px;
    font-size: 1rem;
    text-align: left;
    color: white;
    background-color: rgba(255, 0, 68, 0.985);
    font-family: rob-bld;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    margin-right: 10px;
  }
  .admh .ordv button:nth-child(2){
    background-color: rgb(0, 180, 72);
  }
  .admh .ordv button:nth-child(3){
    background-color: rgb(108, 0, 180);
  }
  .admh .ordv button:hover{
    background-color: rgb(0, 4, 234);
  }
</style>

<template>
   <div class="trkv">
     <button>Post track</button>
     <div class="trk">
        <b>On 12.2.2334</b>
        <p contenteditable="true">Authentication was implemented !</p>
     </div>
   </div>
</template>

<script setup>
import { onMounted, ref,defineProps,defineEmits } from "vue"
import * as NodeNexus from "../res/NodeNexusAPIv1.js" 

let prop = defineProps(["orderid"])
let emits = defineEmits(["msg"])

let tracks = ref([])
/*let loadtracks = async function(){
   let trcks = await NodeNexus.OrderTracks(prop.orderid,sessionStorage.getItem("adminkey"))
   
}
let posttrack = async function(){
   let msg = prompt("Enter project status")
   let posted = await NodeNexus.PostTrack(prop.orderid,msg,sessionStorage.getItem("adminkey"))
   if(posted.data === "ORDER_NOT_EXISTS"){
      emits("msg","Order not found")
   }
   else if(posted.data){
      
   }
}*/
</script>

<style scoped>
@import url('../res//Roboto.css');

.trkv{
   display: flex;
   flex-direction: column;
   width: 60%;
}
.trkv button{
   align-self: flex-end;
   border: none;
   margin-top: 15px;
   font-size: 1rem;
   text-align: left;
   color: white;
   background-color: rgba(0, 55, 255, 0.985);
   font-family: rob-bld;
   border-radius: 10px;
   padding: 10px;
   cursor: pointer;
}
.trkv button:hover{
   background-color: rgb(0, 169, 84);
}
.trkv .trk {
   display: flex;
   flex-direction: column;
   border-radius: 7px;
   padding: 10px;
   margin-top: 15px;
   cursor: pointer;
}
.trkv .trk b,.trkv .trk p{
    font-family: rob-bld;
    color: rgb(225, 225, 225);
    font-size: 1rem;
}
.trkv .trk p{
   font-family: rob-lt;
   font-weight: unset;
   font-size: 1rem;
   color: white;
}
.trkv .trk:hover{
   background-color: rgba(255, 255, 255, 0.088);
}
</style>


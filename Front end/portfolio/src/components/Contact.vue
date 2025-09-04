<template>
    <div class="contact">
        <form>
            <h5>Contact</h5>
            <div>
               <input type="text" placeholder="Your name" :ref="setinputs">
               <input type="email" placeholder="Your email" :ref="setinputs">
               <input type="text" placeholder="Subject" :ref="setinputs">
               <textarea placeholder="Message" :ref="setinputs"></textarea>
            </div>
            <b @click="sendMailToDeveloper">SEND MESSAGE</b>
        </form>
    </div>
   </template>
   
   <script setup >
   import {sendMail} from "../res/NodeNexusAPIv1.js"
   import { defineProps,ref } from "vue";
   
      const showmessage = defineProps(["message"])
      let inputs = ref([])
      let setinputs = (e)=>{
        inputs.value.push(e)
       }

      let sendMailToDeveloper = async ()=> {
      
      const {subject,msg,email,name} = {
        msg:inputs.value[3].value,
        email:inputs.value[1].value,
        subject:inputs.value[2].value,
        name:inputs.value[0].value
      }
      const isNotEmpty = msg !== "" && subject !==  "" && email !== "" && name !== ""
      if(isNotEmpty){
        let isSent = await sendMail(msg,subject,email,name)
        if(isSent.data){
          showmessage.message("You provided information was sent to developer !")
        }
        else{
          showmessage.message("Something went wrong !")
        }
      }
      else{
        showmessage.message("Please fill all fields !")
      }
    }
   </script>
   
   <style scoped src="../css/contact.css">
   
   </style>
   
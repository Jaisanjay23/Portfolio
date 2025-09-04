<template>
    <div class="mhold">
        <b class="msg"><i class="fa-solid fa-circle-info"></i>{{ props.msg }}</b>
    </div>
</template>
   
<script setup>
   import { defineProps } from 'vue';

   let props = defineProps(["msg"])
   
</script>
   
<style scoped >
   @import url("../res/Roboto.css");
  
   .mhold{
    width: 100%;
    position: fixed;
    top: 100px;
    display: flex;
    justify-content: center;
    padding: 15px;
   }
   .msg{
     font-family: rob-bld;
     font-weight: lighter !important;
     color: rgba(255, 255, 255, 0.821);
     font-size: 1.2rem; 
     border-radius: 10px;
     padding: 10px;
     background-color: black;
   }
   .mhold .msg i{
    color: green;
    font-size: 1.2rem;
    margin-right: 10px;
   }

</style>
   
<template>
    <div class="nav">
    <img src="../res/logo.png">
    <div :class="'topics '+SideBar">
        <i :class="'fa-solid '+ (SideBar === 'sd'?'fa-xmark':'fa-bars')"  @click="SidebarFn"></i>
        <a :class="(SideBar === 'sd' ? 'tp':'n')" href="#ab">About</a>
        <a :class="(SideBar === 'sd' ? 'tp':'n')" href="#sk">Skills</a>
        <a :class="(SideBar === 'sd' ? 'tp':'n')" href="#edu">Education</a>
        <a :class="(SideBar === 'sd' ? 'tp':'n')" href="#pr">Projects</a>
        <a :class="(SideBar === 'sd' ? 'tp':'n')" href="#st">Our Story</a>
        <a :class="(SideBar === 'sd' ? 'tp':'n')" @click="trigger('track')">Track order</a>
        <a :class="(SideBar === 'sd' ? 'tp':'n')" @click="trigger('order')">Order now</a>    
    </div>
    </div>
</template>
   
<script setup>
   import {ref,defineEmits} from "vue"

   let SideBar = ref('nsd')
   let SidebarFn = ref(triggerSidebar)
   
   async function triggerSidebar(){
      SideBar.value = SideBar.value === "nsd" ? 'sd':'nsd'
   }

   let trigger = defineEmits(["order","track"])

</script>
   
<style scoped src="../css/nav.css">
   
</style>
   
<template>
    <div class="story" id="st">
        <b class="tit">Our Story</b>

        <div :style="{height:showmore ? 'fit-content':'400px'}">
           <h5>My Story</h5>
           <p>
            I was interested in Developing web application using MEVN & MERN stack and using different technologies.
            I was not interested in school studies due to school teaches the concepts through theoretical way. 
            But I like to learn concepts through practicaly. I started the practical journey of programming in before one month end of the corona lockdown. In IX standard, I started learning programming through Visual Basic 6.0 but I not grasped the concepts clearly. In before one month end of corona lockdown I clearly grasped the concept of programming clearly through learning Java programming. In XI standard, I successfully completed one java based project called Notepad  after started XI. While I was studying XI, I learned deep root of how programming works in the compiler or interpreter level and I understood that the 
Return concept plays a vital role in programming and Return concept is simple and Return concept is the core in programming and it is the  power of building complex programs . And later I started learning web development such as HTML,CSS,JS. After that I started XII standard. While I studying XII standard, I completed many mini Java script based projects like Image scrolling, Search engine (using list of data). 
 I deeply understood the concepts of web development and then I started learning NodeJS , Express JS. Then I successfully completed school studies and Then I joined the BCA course in a college. In college, First year beginning, I built one E-Commerce based web site called Arul foods like zomato using HTML ,CSS ,JS ,Node JS ,Express JS and Mongo DB . In second year, I started learning front end frameworks namely react JS and vue JS. Then I built one Realtime chat application called Wave chat and After this I learned the MEVN stack completely and I Built two projects using MEVN stack namely Form Nest (Like a Google form), Galaxy (Like social media such as Twitter).
           </p>
           <b class="show"><span @click="toogle">{{showmore ? 'Show less':'Show more'}}</span></b>
    </div>
    
</div>
</template>

<script setup>
import {ref} from "vue"

let showmore = ref(false)

function toogle(){
    showmore.value = !showmore.value
    console.log(showmore.value)
}
</script>
<style src="../css/story.css" scoped>
</style>
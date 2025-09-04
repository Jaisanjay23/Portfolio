<template>
   <div class="portfolio">
   
    <div class="about" id="ab">
        <section>
        <h2>Hi, I am Jai sanjay V</h2>
        <b>
            <span>I am a <span class="role">ME<span>V</span>N & ME<span>R</span>N Stack Developer</span></span>
        </b>
        <p>
            I am a MEVN, MERN stack and React native  developer and I have a knowledge of MEVN stack at intermediate level 
            and I like to work on new projects using new technologies. I will give perfect output of project to you.
        </p>
        <a :href="resume">VIEW RESUME</a>
        </section>

        <img src="../res/avatar.jpeg">
    </div>
    
    <div class="skills" id="sk">
       <h4>Skills</h4>
        <div class="front">
        <b class="tit">Front end</b>

        <section>
        <b><img src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png"> HTML5</b>
        <b><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png"> CSS</b>
        <b><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png"> JS</b>
        <b><img src="../res/vuejs.png"> VUE JS</b>
        <b><img src="../res/reactjs.png"></img>REACT JS & REACT NATIVE (ANDROID)</b>
        </section>
        </div>
        
        <div class="p2">
        <div class="back">
            <b class="tit">Back end</b>

            <section>
            <b><img src="../res/nodejs.png"> NODE JS</b>
            <b><img src="../res/mongodb.png"> MONGO DB</b>
            <b><img src="../res/expressjs.png"> EXPRESS JS</b>
            </section>
        </div>

        <div class="others">
            <b class="tit">Other tools</b>

            <section>
            <b><img src="../res/chromedevtools.png"> CHROME DEV TOOLS</b>
            <b><img src="../res/vscode.png"> VS CODE</b>
            <b><img src="../res/git.png"> GIT</b>
            <b><img src="../res/github.png"> GITHUB</b>
            </section>
        </div>
        </div>

    </div>

    <Story/>
    <Education/>
    <Projects/>
    <Contact :message="showmessage"/>

    <Track v-if="state == 'track'"/>
    <Order v-if="state == 'order'"/>
    
    <footer>
        <div>
            <img src="../res/logo.png">
            <b>Node Nexus</b>
        </div>
        <section>
            <b>Contact us</b>
            <sep>
            <a class="fa-solid fa-phone" href="tel:+917418323622"></a>
            <a class="fa-regular fa-envelope" href="mailto:perunkarunai@gmail.com"></a>
            <a class="fa-brands fa-github" href="https://github.com/JaiSanjay74"></a>
            <a class="fa-solid fa-globe" href="#"></a>
            </sep>
        </section>
        <h5>Enjoy experiencing new technologies in MEVN stack</h5>
    </footer>

    <Nav @order="triggerOrder" @track="triggerTrack"/>
    <Msg :msg="msg" v-if="msg != 'null'"/> 
    </div>
</template>

<script setup>
   import { ref,nextTick,provide,onMounted} from 'vue';
   
   let resume = ref("")

   let state = ref("none")
   let triggerOrder = async ()=>{
    state.value = "order"
    await nextTick()
    document.getElementById("ord").scrollIntoView()
   }
   let triggerTrack = async ()=>{
    state.value = "track"
    await nextTick()
    document.getElementById("trk").scrollIntoView()
   }
   
   let msg = ref("null")
   let showmessage = (mssg)=>{
    msg.value = mssg
    setTimeout(()=>{msg.value = "null"},3000)
   }
   provide("Message",showmessage)

   onMounted(()=>{
    fetch("https://sample-3961a-default-rtdb.firebaseio.com/Portfolio.json").then((v)=>{
    v.json().then((v)=>{
        resume.value = v.ResumeURL
    })
  })
   })
</script>

<style scoped src="../css/portfolio.css">

</style>
<style scoped src="../css/skills.css">

</style>

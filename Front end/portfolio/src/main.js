

import './main css/core.css'

import { createApp } from 'vue'
import App from './App.vue'
import Navbar from "./components/Navbar.vue"
import Message from './components/Message.vue'
import Order from './components/Order.vue'
import Contact from './components/Contact.vue'
import Portfolio from './components/Portfolio.vue'
import story from './components/story.vue'
import edu from './components/Edu.vue'
import Projects from './components/Projects.vue'
import Track from "./components/Track.vue"



let app = createApp(App)

app.component("Portfolio",Portfolio)
app.component("Msg",Message)
app.component("Nav",Navbar)
app.component("Order",Order)
app.component("Contact",Contact)
app.component("Story",story)
app.component("Education",edu)
app.component("Projects",Projects)
app.component("Track",Track)

// Configuring vue router 
//app.use(router())


app.mount('#app')

<template>
    <div class="trackorder" id="trk">
    <div class="track" v-if="tracks == 'null'">
          <h5>Track Your Order</h5>
          <input type="text" placeholder="Order ID" ref="ordid">
          <button @click="Track">Track order</button>
    </div>

    <div class="result" v-else>
        <h5>Tracked information</h5>
        <div class="ord">
            <b><i :class="ordered.info.symbol"></i><span>{{ordered.info.text}}</span></b> 
        </div>
        <div class="ln" :style="{borderColor:ordered.info.barcolor}"></div>
        <div class="ord" >
            <b><i class="fa-solid fa-check" :style="{backgroundColor:ordered.info.barcolor}"></i><span>Building</span></b> 
        </div>
        <div class="ln lmsg" :style="{borderColor:delivered.info.barcolor}">
            <div class="pd" v-for="track in tracks">
                <b>On {{track.date}}</b>
                <p>{{track.message}}
                </p>
            </div>
        </div>
        <div class="ord" >
            <b><i class="fa-solid fa-check" :style="{backgroundColor:delivered.info.barcolor}"></i><span>Delivered</span></b> 
        </div>
        
        <button @click="cancelorder">Cancel order</button>
    </div>

    </div>
</template>

<style src="../css/track.css" scoped></style>

<script src="../js/Track.js"></script>
import { ref ,inject,reactive} from "vue"
import * as NodeNexus from "../res/NodeNexusAPIv1.js"


export default{
    setup(){
      let tracks = ref("null")
      let ordered = reactive({})
      let delivered = reactive({})
      let Showmessage = inject("Message")

      let Track = async function () {
         sessionStorage.setItem("ordid",this.$refs.ordid.value)
         let orderid = this.$refs.ordid.value
         
         
         if(this.$refs.ordid.value != ""){
            let track = await NodeNexus.TrackOrder(orderid)
            if(track.data !== false){
               tracks.value = (track.data.Accepted) ? track.data.Tracks : []
   
               ordered.info = (track.data.Accepted || track.data.Delivered) ? {
                  symbol:"fa-solid fa-check",
                  text:"Order on " + track.data.OrderedOn,
                  barcolor:'rgb(1, 212, 85)'
               }:
               ordered.info = {
                  symbol:"fa-solid fa-clock-rotate-left",
                  text:"Order pending",
                  barcolor:"rgba(255, 255, 255, 0.374)"
               }

               delivered.info = (track.data.Delivered) ? {
                   symbol:"fa-solid fa-check",
                   text:"Delivered on " + track.data.deliveredOn,
                   barcolor:'rgb(1, 212, 85)'
                }:{
                   symbol:"fa-solid fa-clock-rotate-left",
                   text:"Not delivered",
                   barcolor:"rgba(255, 255, 255, 0.374)"
                }
            }
            else{
                Showmessage("No order found !")
            }
         } 
         else{
            Showmessage("Please enter Order ID !")
         }
        }
        
        let cancelorder = async function(){
            let orderid = sessionStorage.getItem("ordid")
            let cancelled = await NodeNexus.CancelOrder(orderid)
            if(cancelled.data){
               Showmessage(orderid + "was cancelled successfully !")
               location.reload()
            }
            else{
               Showmessage("Something went wrong !")
            }
        }
      return {tracks,Track,cancelorder,ordered,delivered}
    }
}
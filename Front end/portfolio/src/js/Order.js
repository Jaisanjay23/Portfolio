import { ref ,inject,watch, onMounted, onUpdated} from "vue"
import * as NodeNexus from "../res/NodeNexusAPIv1.js"


export default{
    setup(){
       let Showmessage = inject("Message")
       let company = ref("User type")
       let IsOrderedSuccess = ref(false)
       let inputs = ref([])
         
       watch(company,(v)=>{
         if(v == "company"){
            inputs.value.splice(0,inputs.value.length)
            console.log(inputs)
         }
       })

       let setinputs = (e)=>{
        inputs.value.push(e)
       }

       let Order = async function (){

        try{
            let dataset = {
                hir_nm:inputs.value[0].value,
                email:inputs.value[1].value,
                ph_nm:inputs.value[2].value,
                usr_type:inputs.value[3].value
             }
            
             if(company.value == "company"){
                 dataset.comp_nm = inputs.value[4].value
                 dataset.proj_nm = inputs.value[5].value,
                dataset.country = inputs.value[6].value,
                dataset.app_type = inputs.value[7].value,
                dataset.features = inputs.value[8].value
             }
             else{
                dataset.proj_nm = inputs.value[4].value,
                dataset.country = inputs.value[5].value,
                dataset.app_type = inputs.value[6].value,
                dataset.features = inputs.value[7].value
             }
             
             let IsAnyEmptyField = false
             for(let field of Object.keys(dataset)){
                 if(field == "app_type" || field == "usr_type"){
                     continue
                 }
                 IsAnyEmptyField = dataset[field] == "" ? true : false 
             }
             
             if(!IsAnyEmptyField){
                 let result = await NodeNexus.Order(dataset)
                 if(result.data == "ALREADY_ORDERED"){
                     Showmessage("Sorry, already other order was going. so please try after 2 week !")
                 }
                 else if(result.data == "ERROR"){
                     Showmessage("Something went wrong !")
                 }
                 else{
                     IsOrderedSuccess.value = result.data
                 }
             }
             else{
                 Showmessage("Please fill all fields !")
             }
        }
        catch(e){
            Showmessage("Something went wrong !")
        }    
        }
    
       return {Order,setinputs,company,IsOrderedSuccess}
    }
}
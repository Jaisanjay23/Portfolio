<template>
    <div class="order" id="ord">
      <div class="hold" v-if="IsOrderedSuccess == false">
      <b>Book Order</b>
      <div class="needs">
         <input type="text" placeholder="Your name" :ref="setinputs" >
         <input type="email" placeholder="Email" :ref="setinputs">
         <input type="text" placeholder="Mobile number" :ref="setinputs">
         <select :ref="setinputs" v-model="company">
            <option>User type</option>
            <option value="company">Company</option>
            <option value="individual">Individual</option>
         </select>   
         <input type="text" placeholder="Company name" :ref="setinputs" v-if="company == 'company'">
         <input type="text" placeholder="Project name" :ref="setinputs">
         <input type="text" placeholder="Country" :ref="setinputs">
         <select :ref="setinputs"> 
            <option>Application type</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Informational">Informational</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Educational">Educational</option>
            <option value="Government">Government based</option>
            <option value="Tour">Tour booking applications</option>
            <option value="Temple">Temple office application</option>
            <option value="Spirituality">Spirituality</option>
            <option value="Music media">Music media</option>
            <option value="Hospital">Hospital management</option>
            <option value="others">Others</option>
         </select>
         <textarea placeholder="Features" :ref="setinputs"></textarea>
         <button @click="Order(msg)">Book Order</button>
      </div>
   </div>

   <div class="ordered" v-if="typeof IsOrderedSuccess == 'string'">
      <h5>Your order was successfully booked !</h5>
      <b>Your order ID</b>
      <b>{{IsOrderedSuccess}}</b>
      <p>Keep this order ID very safely. Becuase it is a proof for this project is yours only. It will be verified when project was completed 
         and ready for deliver to you. We are also sent this order ID to you email. 
         You can track your order in the order tracking section.
      </p>
   </div>
    </div>
</template>
   
<script src="../js/Order.js">
</script>
   
<style scoped src="../css/order.css">
</style>
   


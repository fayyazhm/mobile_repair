
const screen_modal = Vue.component("screen_modal", {
    template: `
    <div>
    <b-modal v-model="showSpinner" hide-footer hide-header>
    <div class="text-center">
      <b-spinner style="width: 2.5rem; height: 2.5rem;" variant="primary" ></b-spinner>
      <p>Your Request Is Being Sent...</p>
    </div>
    </b-modal>
    <b-modal v-model="showModal" hide-footer  @hide="onModalClose" title="Screen Repair Details" title-class="mx-auto">
    <form>
    <div id="loading-modal" class="modal" :class="{ 'show': loading }">
    <div class="modal-content">
      <div id="loading-circle"></div>
    </div>
  </div>
    <div class="form-group" style="margin-bottom:10px;">
        <label for="productSelect">Select Product:</label>
          <select class="form-control" id="productSelect" v-model="selectedProduct">
            <option v-for="i in product" :key="i.product_id" :value="i.product_name">{{ i.product_name.toUpperCase() }}</option>
            <option key="others" value="Others">OTHERS</option>
          </select>
    </div>
    <div v-if="selectedProduct === 'Others'" class="form-group" style="margin-bottom:10px;">
        <input type="text" class="form-control" v-model="otherProduct" placeholder="Other Product" required>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
        <input type="text" class="form-control" v-model="user_name" placeholder="Your Name" required>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
        <input type="email" class="form-control" v-model="email" placeholder="Your Email" required>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
      <input type="tel" class="form-control" v-model="mobile" placeholder="Your Mobile Number" pattern="[0-9]{10}" title="Please enter a 10-digit numeric mobile number" required>
    </div>
      <div class="form-group" style="margin-bottom:10px;">
        <input type="text" class="form-control" v-model="house_address1" placeholder="House and Street Address" required>
      </div>
      <div class="form-group" style="margin-bottom:10px;">
        <input type="text" class="form-control" v-model="house_address2" placeholder="City and Zip Code" required>
      </div>
      <div class="form-group" style="margin-bottom:10px;">
        <textarea class="form-control" v-model="message" placeholder="Your Message" rows="5" required></textarea>
      </div>
      <div style="text-align: center;">
        <button type="submit" class="btn btn-primary" @click="submitform" >Send Message</button>
      </div>
    </form>
  </b-modal>
  </div>  `,
  props: {
    showModal: false // Define showModal as a prop
  },
  data(){
    return{
        user_name:"",email:"",mobile:"",house_address1:"",house_address2:"",message:"",product:"",selectedProduct:"",otherProduct:"",showSpinner:false
    }
  },
  methods: {
    onModalClose() {
        console.log("close hello modal")
      this.$emit('close'); // Emitting 'close' event when the modal is closed
    },
    submitform(){
        event.preventDefault();
        var company;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(this.selectedProduct==='Others'){
            company=this.otherProduct;
        }
        else{
            company=this.selectedProduct
        }
        if(this.user_name ==="" || this.mobile ===""||this.selectedProduct==="" ||this.message===""){
          alert("please fill the fields with valid value")
        }
        else if(this.mobile.length!=10){
          alert("please enter a valid 10 digit mobile number")
        }
        else if(!emailPattern.test(this.email)){
          alert("please enter a valid email")
        }
        else{
        this.showSpinner=true;
        const data={user_name:this.user_name,email:this.email,mobile:this.mobile,house_address1:this.house_address1,house_address2:this.house_address2,
            type:"screen", selectedProduct:company,message:this.message };
        fetch("/add_details",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).
        then(response=>{return response.json()}).
        then(
        data=>{
          if(data=="data successfully added"){
            this.showSpinner=false;
            alert("Thank you for your request! We'll get back to you shortly.")
            console.log(data)
            this.$emit('close');
          }
        }
      ).catch(error=>{
        this.showSpinner=false
        console.log("error:",error)})
      }
    },
    },
      mounted(){
        console.log("mounted")
        fetch("/product").then(response=>{return response.json()}).
        then((data)=>{
            this.product=data["product"].filter(p => p.product_type === 'screen')
            console.log(this.product)
        }).catch(error=>console.log(error))
      }


});

export default screen_modal;

console.log("addproductmodal")
const addproduct_modal = Vue.component("addproduct_modal", {
    template: `
    <div>
    <b-modal v-model="showModal" hide-footer @hide="onModalClose" title="Add Product">
    <template #modal-footer>
    <!-- Leave this section empty to remove the footer -->
    </template>
    <form>
    <div class="form-group" style="margin-bottom:10px;">
        <label for="productSelect">Select Type</label>
        <select class="form-control" id="productSelect" v-model="selectedProduct">
          <option selected>Open this select menu</option>
          <option value="screen">SCREEN</option>
          <option value="battery">BATTERY</option>
          <option value="mobile">MOBILE</option>
          <option value="others">OTHERS</option>
        </select>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
        <input type="text" class="form-control" v-model="product_name" placeholder="Product Name" required>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
      <input type="number" class="form-control" v-model="product_quantity" placeholder="Product Quantity" min="1"  required>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
      <input type="text" class="form-control" v-model="product_rate" placeholder="Product Rate" required>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
      <input type="text" class="form-control" v-model="product_manufacture" placeholder="Product Manufacture" required>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
        <textarea class="form-control" v-model="product_description" placeholder="Product Description" required rows="3"></textarea>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
      <input type="text" class="form-control" v-model="product_expirydate" placeholder="DD-MM-YYYY"required>
      <small class="form-text text-muted">Enter date in DD-MM-YYYY format.</small>
    </div>
    <div class="form-group" style="margin-bottom:10px;">
        <label for="exampleFormControlFile1">Choose Image File</label>
        <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange">
    </div>
      <button type="submit" class="btn btn-primary" @click="submitform" >ADD PRODUCT</button>
    </form>
  </b-modal>
  </div>  `,
  props: {
    showModal: true // Define showModal as a prop
  },
  data(){
    return{
        selectedProduct:"Open this select menu",imageFile:"",product_name:"",product_quantity:"",product_rate:"",product_manufacture:"",
        product_expirydate:"",product_description:""
    }
  },
  methods: {
    onModalClose() {
        console.log("close hello modal")
      this.$emit('close'); // Emitting 'close' event when the modal is closed
    },
    onFileChange(event) {
      this.imageFile = event.target.files[0];
    },
    submitform(){
        var company;
        company=this.otherProduct;
        if(this.selectedProduct==='Others'){
        }
        else{
            company=this.selectedProduct
        }
        if (this.product_quantity<=0){
          alert("please provide valid qty")
        }
        else if(this.product_rate<=0){
          alert("please provide valid price")
        }
        else if(this.selectedProduct==="Open this select menu"){
          alert("please select valid type")
        }
        else{
        const formData = new FormData();
        formData.append('selectedProduct', this.selectedProduct);
        formData.append('product_name', this.product_name);
        formData.append('product_quantity', this.product_quantity);
        formData.append('product_rate', this.product_rate);
        formData.append('product_manufacture', this.product_manufacture);
        formData.append('product_expirydate', this.product_expirydate);
        formData.append('file', this.imageFile);
        formData.append('product_description', this.product_description)
        fetch("/product_add_details",{method:"POST",body:formData}).
        then(response=>{return response.json()}).
        then(
        data=>{
          if(data=="data successfully added"){
            alert("product successfully added")
            console.log(data)
            this.$emit('close');
          }
        }
      ).catch(error=>console.log("error:",error))
      }
    },
    },

});

export default addproduct_modal;

function datemodi(a){
  const months = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  }

  const parts=a.split(" ")
  const year = parts[3];
  const month = months[parts[2]];
  const day = parts[1];


  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}


console.log("editproductmodal")
const editproduct_modal = Vue.component("editproduct_modal", {
    template: `
    <div>
    <b-modal v-model="showModal" hide-footer  @hide="onModalClose" title="Edit Product">
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
      <input type="text" class="form-control" v-model="product_quantity" placeholder="Product Quantity" required>
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
      <input type="text" class="form-control" v-model="product_expirydate" placeholder="Product Expriydate">
    </div>
    <div class="form-group" style="margin-bottom:10px;">
        <label for="exampleFormControlFile1">Choose Image File</label>
        <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange">
    </div>
      <button type="submit" class="btn btn-primary" @click="submitform" >EDIT</button>
      <button type="submit" class="btn btn-danger" @click="deleteform" >DELETE</button>
    </form>
  </b-modal>
  </div>  `,
  props: {
    showModal: true,
    productId:""
  },
  data(){
    return{
        selectedProduct:"",imageFile:"",product_name:"",product_quantity:"",product_rate:"",product_manufacture:"",
        product_expirydate:"",prod:"",product_description:""
    }
  },
  methods: {
    onModalClose() {
      this.$emit('close'); // Emitting 'close' event when the modal is closed
    },
    onFileChange(event) {
      this.imageFile = event.target.files[0];
      console.log("image change")
    },
    submitform(){
        event.preventDefault();
        var company;
        if(this.selectedProduct==='Others'){
            company=this.otherProduct;
        }
        else{
            company=this.selectedProduct
        }
        const formData = new FormData();
        formData.append('id',this.productId)
        formData.append('selectedProduct', this.selectedProduct);
        formData.append('product_name', this.product_name);
        formData.append('product_quantity', this.product_quantity);
        formData.append('product_rate', this.product_rate);
        formData.append('product_manufacture', this.product_manufacture);
        formData.append('product_expirydate', this.product_expirydate);
        formData.append('file', this.imageFile);
        formData.append('product_description', this.product_description);
        console.log(formData)
        console.log('edit images')
        fetch("/product_edit_details",{method:"POST",body:formData}).
        then(response=>{return response.json()}).
        then(
        data=>{
          if(data=="data successfully edited"){
            alert("product successfully edited")
            window.location.reload();
            console.log(data)
            this.$emit('close');

          }
        }
      ).catch(error=>console.log("error:",error))
      },
      deleteform(){
        event.preventDefault();
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
         console.log("confirmed")
         fetch(`/product/delete/${this.productId}`).then(response=>{return response.json()}).
            then((data)=>{
              if(data==="product successfully deleted"){
                alert("product successfully deleted")
                window.location.reload();
                console.log(data)
                this.$emit('close');
              }
        }).catch(error=>console.log(error))
        } else {
          this.$emit('close');
        }
      }
    },
    mounted(){
      fetch("/product").then(response=>{return response.json()}).
        then((data)=>{
            var produ;
            produ=data["product"];
            console.log(this.productId , "productid")
            const produc=produ.filter(a=>a.product_id===this.productId)[0]
            this.selectedProduct=produc.product_type;
            this.product_name=produc.product_name;
            this.product_quantity=produc.product_quantity;
            this.product_rate=produc.product_rate;
            this.product_manufacture=produc.product_manufacture;
            this.product_description=produc.product_description
            this.product_expirydate=datemodi(produc.product_expirydate)
        }).catch(error=>console.log(error))
    }

});

export default editproduct_modal;

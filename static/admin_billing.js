import admin_header from "./admin_header.js";

const admin_billing = Vue.component("admin_billing", {
    template: `
    <div>
    <admin_header_componenet/>
    <body style="min-height: 100vh;">
    <b-modal v-model="showSpinner" hide-footer hide-header>
    <div class="text-center">
      <b-spinner style="width: 2.5rem; height: 2.5rem;" variant="primary" ></b-spinner>
      <p>Bill is Being Generated...</p>
    </div>
    </b-modal>
    <div class="container mt-5 custom-border">
        <div class="row justify-content-center ">
            <div class="col-md-12">
                <div class="invoice-card" id="invoice">
                    <div class="card-header">
                        <h5 class="card-title text-center">Invoice</h5>
                    </div>
                    <div class="invoice-card-body">
                        <div class="mb-3">
                            <label for="name" class="form-label" style="font-weight:bold">Name:</label>
                            <input type="text" class="form-control" v-model="name" id="name">
                        </div>
                        <div class="mb-3">
                            <label for="mobile" class="form-label" style="font-weight:bold">Mobile Number:</label>
                            <input type="text" class="form-control" v-model="mobile" id="mobile">
                        </div>
                        <hr>
                        <div id="products">

                        <div class="row mb-3">
                            <div class="col-md-3">
                                <label class="column-header">Product Name</label>
                            </div>
                            <div class="col-md-2">
                                <label class="column-header">Product Quantity</label>
                            </div>
                            <div class="col-md-2">
                                <label class="column-header">Product Price</label>
                            </div>
                            <div class="col-md-2">
                                <label class="column-header">Product GST</label>
                            </div>
                            <div class="col-md-2">
                                <label class="column-header">Total</label>
                            </div>
                        </div>

                          <div v-for="(product, indexp) in products" :key="index" class="row mb-3">
                            <div class="col-md-3">
                              <input type="text" class="form-control" placeholder="Product Name" v-model="product.productname" :list="'productNames' + indexp" @input="filterProductNames(product, indexp)" @input="selectProduct(product.productname, indexp)">
                                  <datalist :id="'productNames' + indexp">
                                      <option v-for="(filteredProduct, index) in filteredProductNames[indexp]" :key="index">{{ filteredProduct }}</option>
                                  </datalist>
                            </div>

                              <div class="col-md-2">
                                  <input type="number" class="form-control" placeholder="Quantity" v-model="product.quantity" @input="updateTotal(product)">
                              </div>
                              <div class="col-md-2">
                                  <input type="number" class="form-control" placeholder="Price" v-model="product.price" @input="updateTotal(product)">
                              </div>
                              <div class="col-md-2">
                                <input type="number" class="form-control" placeholder="GST" v-model="product.GST" @input="updateTotal(product)">
                              </div>
                              <div class="col-md-2">
                              <input type="text" class="form-control" placeholder="Total" :value="getTotal(product)" readonly>
                                </div>
                              <div class="col-md-1">
                              <button v-on:click="del(product.productname)" class="input-group-append btn btn-danger" style="margin-right:20px" >
                              <i class="bi bi-trash"></i>
                              </button>
                              </div>
                          </div>
                        </div>
                        <button class="btn btn-primary" @click="addProductRow()">Add Product</button>
                        <hr>
                        <div class="mb-3">
                            <label for="total"  class="form-label" style="font-weight:bold">Total:</label>
                            <input type="text" :value="fullTotal()" class="form-control" id="total" readonly>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-success" @click="submitBill">Generate Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    </div>
    `,
    components:{'admin_header_componenet':admin_header
},
data(){
  return{
    name:"",mobile:"",products:[{}], filteredProductNames: [],full_products:"",showSpinner:false
  }
},
mounted(){
    fetch("/product").then(response=>{return response.json()}).
        then((data)=>{
            this.full_products=data['product']
            console.log(this.full_products+ "full products")
        }).catch(error=>console.log(error))
},
methods: {
  addProductRow() {
    this.products.push({});
    this.filteredProductNames.push([])
  },
  del(prod) {
    console.log(prod)
    for(let i=0;i<this.products.length;i++){
        if(this.products[i].productname===prod){
            this.products.splice(i,1)
            break;
        }
    }
  },
  getTotal(product){
    if(isNaN(product.total)){
        return 0
    }
    else{
        return product.total.toFixed(2)
    }
  },
  submitBill(){
        if(this.name ==="" || this.mobile ===""){
          alert("please fill the fields with valid value")
        }
        else if(this.mobile.length!=10){
          alert("please enter a valid 10 digit mobile number")
        }
        else{
            this.showSpinner=true;
            const data={products_list:this.products,buyer_name:this.name,buyer_mobile:this.mobile};
            fetch("/bill",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).
            then(response=>{return response.json()}).
            then(
            data=>{
            if(data['message']=="data successfully added"){
                this.showSpinner=false;
                alert("Bill Generated Successfully")

                window.location.href = `/download/${data['pdf_filename']}`
            }
            }
        ).catch(error=>{
          this.showSpinner=false;
          console.log("error:",error)})
        }
    },
  updateTotal(product){
        if (product.quantity <= 0 || product.price <=0 || product.GST <=0) {
            alert("enter a valid qty")
        }
        else {
            product.total = (product.quantity * product.price) + (product.price * (product.GST / 100))
        }
  },
  fullTotal(){
    let tot=0;
    for(let i=0;i<this.products.length;i++){
        if (isNaN(this.products[i].total)){
            tot+=0
        }
        else{
        tot+=this.products[i].total
        }
    }
    return tot.toFixed(2)
  },
  filterProductNames(product,index) {
    const input = product.productname.toLowerCase();
    if (input) {
      this.filteredProductNames[index] = this.full_products
        .map(p => p.product_name.toLowerCase())
        .filter(name => name.includes(input));
    } else {
      this.filteredProductNames[index] = [];
    }
  }
  ,
  selectProduct(productName,index) {
    console.log("selectproduct")
    const product = this.full_products.find(p => p.product_name.toLowerCase() === productName.toLowerCase())
    if (product) {
        this.products[index].productname = product.product_name;
        console.log("inside")
        console.log(this.products[index].productname,product.product_name)
        this.products[index].price = product.product_rate;
        this.filteredProductNames[index] = [];
      }
}
}
});

export default admin_billing;

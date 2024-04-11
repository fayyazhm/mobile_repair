  import header from "./header.js";
  import product_modal from "./product_buymodal.js";

  const product_details = Vue.component("product_details", {
      template: `
      <div>
      <header_component/>
          <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="card">
                <div class="text-center" style="margin-top:10px">
                <img :src="'/static/product_images/'+product_image" :alt="product_name" class="card-img-top">
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ product_name }}</h5>
                  <p class="card-text">Manufacturer: {{ product_manufacture }}</p>
                  <p class="card-text">Price: Rs {{ product_rate }}</p>
                  <p v-if="product_description !== ''" class="card-text">{{ product_description }}</p>
                  <div class="card-footer text-center">
                    <button @click="showProductModal" class="btn btn-primary">Enquire</button>
                  </div>
                  <product_componenet v-if="productModalVisible" @close="hideProductModal" :showModal="productModalVisible" :productId="c"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `,
      props:['c'],
      components:{'header_componenet':header,
      'product_componenet':product_modal
    },
      data(){
          return{
            product_name:"",product_image:"",product_manufacture:"",product_rate:"",product_description:"",productModalVisible:false
          }
        },
      mounted(){
          fetch("/product").then(response=>{return response.json()}).
          then((data)=>{
              this.product=data["product"];
              console.log(this.c);
              const singleProduct = this.product.filter(p => p.product_id == this.c)[0];
              console.log(singleProduct)
              this.product_name=singleProduct.product_name;
              this.product_image=singleProduct.product_image;
              this.product_manufacture=singleProduct.product_manufacture;
              this.product_rate=singleProduct.product_rate;
              this.product_description=singleProduct.product_description
          }).catch(error=>console.log(error))
        },
          methods: {
            showProductModal() {
              this.productModalVisible = true;
            },
            hideProductModal() {
              this.productModalVisible = false;
            },
          }





      }
    );

    export default product_details
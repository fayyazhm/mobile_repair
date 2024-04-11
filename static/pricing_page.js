  import header from "./header.js";

  const pricing_page = Vue.component("pricing_page", {
      template: `
      <div>
      <header_componenet/>
      <div class="container mt-4" align="center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <b-form-group label="Filter By" style="font-weight: bold;">
            <b-form-select v-model="selectedFilter" class="form-control rounded-pill shadow-sm" style="max-width:300px">
              <option value="all">All</option>
              <option value="screen">Screen</option>
              <option value="mobile">Mobile</option>
              <option value="battery">Battery</option>
              <option value="others">Others</option>
            </b-form-select>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group label="Search" style="font-weight: bold;">
            <input type="text" v-model="searchText" class="form-control rounded-pill shadow-sm" style="max-width:300px" placeholder="Search...">
          </b-form-group>
        </div>
      </div>
      <br>
        <div class="pricing-table shadow"">
          <table class="table table-bordered table-hover">
            <thead class="thead-light">
              <tr>
                <th>Service</th>
                <th>Name</th>
                <th>Company</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in displayedProducts" :key="index"  @click="navigateToProduct(i.product_id)">
                <td>{{ i.product_type.toUpperCase() }}</td>
                <td>{{ i.product_name.toUpperCase() }}</td>
                <td>{{ i.product_manufacture.toUpperCase() }}</td>
                <td>{{ i.product_description }}</td>
                <td>Rs {{ i.product_rate.toFixed(2) }}</td>
                <td>
                <div class="img-container" v-if="i.product_image">
                  <img :src="'/static/product_images/'+ i.product_image" :alt="i.product_name" class="img-fluid" style="max-height:200px">
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="overflow-auto mt-3">
        <b-pagination v-model="currentPage" :total-rows="totalProducts" :per-page="perPage" class="mt-3 rounded-pill" align="center"></b-pagination>
        </div>
      </div>
    </div>
      `,
      props:['c'],
      components:{'header_componenet':header},
      data(){
          return{
              product:[],
              selectedFilter:this.c,
              currentPage: 1,
              perPage: 5,
              full_products:[],
              searchText:""
          }
        },
        computed: {
          filteredProducts() {
            const input=this.searchText.toLowerCase();

            if (this.selectedFilter === 'all' && this.searchText=="") {
              return this.product=this.full_products;
            }
            else if (this.selectedFilter === 'all' && this.searchText !== ""){
              return this.product = this.full_products.filter(p =>
                (p.product_name && p.product_name.toLowerCase().includes(input)) ||
                (p.product_type && p.product_type.toLowerCase().includes(input)) ||
                (p.product_manufacture && p.product_manufacture.toLowerCase().includes(input)) ||
                (p.product_description && p.product_description.toLowerCase().includes(input))
              );
          }
            else if(this.selectedFilter !=="all" && this.searchText=="" ) {
              return this.product=this.full_products.filter(p => p.product_type === this.selectedFilter);
            }
            else{
              return this.product=this.full_products.filter(prod => prod.product_type === this.selectedFilter).filter(p=>
                (p.product_name && p.product_name.toLowerCase().includes(input)) ||
                (p.product_type && p.product_type.toLowerCase().includes(input)) ||
                (p.product_manufacture && p.product_manufacture.toLowerCase().includes(input)) ||
                (p.product_description && p.product_description.toLowerCase().includes(input))
              )
            }
          },
          totalProducts() {
            return this.filteredProducts.length;
          },
          displayedProducts() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.filteredProducts.slice(startIndex, endIndex);
          }
        },
        mounted(){
          this.selectedFilter=this.c;
          fetch("/product").then(response=>{return response.json()}).
          then((data)=>{
              this.product=data["product"];
              this.full_products=data['product']
              console.log(this.product)
              console.log(this.full_products+ "full products")
          }).catch(error=>console.log(error))
        },
        created(){
          if(this.c){
            console.log(this.c+ "created")
            this.selectedFilter=this.c
            console.log(this.selectedFilter+ "created")
          }
        },
        methods:{
          navigateToProduct(productId){
            this.$router.push(`/productdetails/${productId}`)
          }

        }
      }
    );

    export default pricing_page
import admin_header from "./admin_header.js";
import addproduct_modal from "./addproduct_modal.js";

const admin_homepage = Vue.component("admin_homepage", {
    template: `
    <div>
    <admin_header_componenet/>
    <div class="container" style="align-items: center">
        <div style="height: 100px;"></div>
        <!-- Cards Section -->
        <div class="row">
            <!-- Card for Adding Products -->
            <div class="col-md-4">
                <div class="card rounded-lg border border-primary p-3 shadow rounded-top rounded-bottom">
                    <div class="card-body">
                        <h5 class="card-title">Add Products</h5>
                        <p class="card-text">Click below to add new products.</p>
                        <button @click="showAddProductModal" class="btn btn-primary">Select</button>
                        <product_component v-if="addProductModalVisible" @close="hideAddProductModal" :showModal="addProductModalVisible"/>
                    </div>
                </div>
            </div>
            <!-- Card for Viewing Requests -->
            <div class="col-md-4">
                <div class="card rounded-lg border border-primary p-3 shadow rounded-top rounded-bottom">
                    <div class="card-body">
                        <h5 class="card-title">View Requests</h5>
                        <p class="card-text">Click below to view requests.</p>
                        <router-link :to="'/request'" class="btn btn-primary">Select</router-link>
                    </div>
                </div>
            </div>

            <!-- Card for Billing -->
            <div class="col-md-4">
                <div class="card rounded-lg border border-primary p-3 shadow rounded-top rounded-bottom">
                    <div class="card-body">
                        <h5 class="card-title">Billing</h5>
                        <p class="card-text">Click below to view billing details.</p>
                        <router-link :to="'/billing'" class="btn btn-primary">Select</router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <div class="card rounded-lg border border-primary p-3 shadow rounded-top rounded-bottom">
                    <div class="card-body">
                        <h5 class="card-title">Edit Products</h5>
                        <p class="card-text">Click below to add new products.</p>
                        <router-link :to="'/product'" class="btn btn-primary">Select</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    `,
    components:{'admin_header_componenet':admin_header,
                    'product_component':addproduct_modal
},
    data() {
        return {
          addProductModalVisible: false,
        };
      },
      methods: {
        showAddProductModal() {
            console.log("inside select")
          this.addProductModalVisible = true;
        },
        hideAddProductModal() {
          this.addProductModalVisible = false;

        },

    },
}
  );

  export default admin_homepage
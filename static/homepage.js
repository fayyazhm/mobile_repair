import header from "./header.js";
import screen_modal from "./screen_modal.js";
import battery_modal from "./battery_modal.js";
import other_modal from "./other_modal.js";
import products_scrolling from "./products_scrolling.js";
import products_carousel from "./products_carousel.js";

const homepage = Vue.component("home_page", {
    template: `
    <div>
        <header_component />
        <section id="services">
            <div class="container">
                <productcarousel_componenet/>
                <h2 style="text-align: center;font-weight:bold" >Our Services</h2>
                <div class="row">
                    <div class="col-md-4 d-flex justify-content-center" style="margin-bottom: 10px;">
                        <div class="service text-center border border-primary p-3 shadow rounded-top rounded-bottom">
                            <h3>Screen Replacement</h3>
                            <p>We offer professional screen replacement services for all major smartphone brands.</p>
                            <button @click="showScreenModal" class="btn btn-primary">Select</button>
                            <screen_componenet v-if="screenModalVisible" @close="hideScreenModal" :showModal="screenModalVisible"/>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex justify-content-center" style="margin-bottom: 10px;">
                        <div class="service text-center border border-primary p-3 shadow rounded-top rounded-bottom">
                            <h3>Battery Replacement</h3>
                            <p>Get your phone's battery replaced by our experienced technicians.</p>
                            <button @click="showBatteryModal" class="btn btn-primary">Select</button>
                            <battery_componenet v-if="batteryModalVisible" @close="hideBatteryModal" :showModal="batteryModalVisible"/>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex justify-content-center" style="margin-bottom: 10px;">
                        <div class="service text-center border border-primary p-3 shadow rounded-top rounded-bottom">
                            <h3>Other Services</h3>
                            <p>We provide various other repair services such as camera repair, speaker replacement, etc.</p>
                            <button @click="showOtherModal" class="btn btn-primary">Select</button>
                            <other_componenet v-if="otherModalVisible" @close="hideOtherModal" :showModal="otherModalVisible"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="purchase-new" style="margin-top:-90px">
            <div class="container d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="service text-center border border-primary p-3 shadow rounded-top rounded-bottom">
                        <h2>Purchase New Phones</h2>
                        <p>Looking to buy a new phone? Check out our latest selection of smartphones.</p>
                        <router-link :to="'/pricing/mobile'" class="btn btn-primary">Select</router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
    components:{
        'header_component':header,
        'screen_componenet':screen_modal,
        "battery_componenet":battery_modal,
        "other_componenet":other_modal,
        "productscroll_componenet":products_scrolling,
        "productcarousel_componenet":products_carousel
    },
    data() {
        return {
          screenModalVisible: false,
          batteryModalVisible:false,
          otherModalVisible:false
        };
    },
    methods: {
        showScreenModal() {
            this.screenModalVisible = true;
        },
        hideScreenModal() {
            this.screenModalVisible = false;
        },
        showBatteryModal() {
            this.batteryModalVisible = true;
        },
        hideBatteryModal() {
            this.batteryModalVisible = false;
        },
        showOtherModal() {
            this.otherModalVisible = true;
        },
        hideOtherModal() {
           this.otherModalVisible = false;
        }
    }
});

export default homepage;

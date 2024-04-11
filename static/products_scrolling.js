
const products_scrolling = Vue.component("products_scrolling", {
    template: `
    <div>
    <div class="image-scroll-container">
        <div class="image-scroll-wrapper">
            <div v-for="(image, index) in images" :key="index" class="image-item">
                <img :src="image" alt="Image" class="image">
            </div>
        </div>
    </div>
    </div>
    `,
data(){
    return{
        images:[

            "/static/product_images/appleiphone15.jpeg",
            "/static/product_images/lenova.jpeg",
            "/static/product_images/realme.jpeg",
            "static/product_images/appleiphone15.jpeg",
            "static/product_images/samsung_battery.webp",
            "static/product_images/motorolla.jpeg"

        ]
    }
},

});

export default products_scrolling;

const products_carousel = Vue.component("products_carousel", {
  template: ` 
  <div class="carousel-container" style="margin-top:-50px">
      <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="2000"
          indicators
          controls
          label-prev=""
          label-next=""
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
      >
          <b-carousel-slide v-for="(image, index) in images2" :key="index">
              <template #img>
                  <img
                      :src="image"
                      alt="Image"
                      class="d-block img-fluid"
                      style="width:900px; height: 400px; object-fit: cover;"
                  >
              </template>
          </b-carousel-slide>
      </b-carousel>
  </div>
  `,
  data() {
      return {
          slide: 0,
          sliding: null,
          images1:[],
          images2:[]
      }
  },
  methods: {
      onSlideStart(slide) {
          this.sliding = true
      },
      onSlideEnd(slide) {
          this.sliding = false
      }
  },
  mounted(){
      fetch("/product").then(response=>{return response.json()}).
      then((data)=>{
          const productlist=data["product"];
          for(let i=0;i<productlist.length;i++){
              if(productlist[i].product_image===""){

              }
              else{
                  var image_name=productlist[i].product_image
                  var image_path=`static/product_images/${image_name}`
                  this.images1.push(image_path)
              }
              console.log(this.images1)
          }
      }).catch(error=>console.log(error))
      fetch("/scroll").then(response=>{return response.json()}).
      then((data)=>{
          const scrolllist=data["path"];
          for(let i=0;i<scrolllist.length;i++){
              var image_path=`static/carousel/${scrolllist[i]}`
              this.images2.push(image_path)
          }
      }).catch(error=>console.log(error))  

  }
});

export default products_carousel;

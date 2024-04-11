import admin_header from "./admin_header.js";

const admin_request = Vue.component("admin_request", {
    template: `
    <div>
    <admin_header_componenet/>
      <div class="container mt-4">
        <h2>View Active Requests</h2>
        <!-- Request Cards -->
        <div class="row">
          <div v-for="request in displayedRequestActive" :key="request.id" class="col-md-6">
            <div class="card request-card">
              <div class="card-body">
                <h5 class="card-title">Request Details</h5>
                <p class="card-text"><strong>Date:</strong> {{ request.date }}</p>
                <p class="card-text"><strong>Type:</strong> {{ request.type }} | <strong>Company:</strong> {{ request.company }}</p>
                <p class="card-text"><strong>Message:</strong> {{ request.message }}</p>
                <p class="card-text"><strong>Mobile:</strong> {{ request.mobile }} | <strong>Username:</strong> {{ request.username }}</p>
                <p class="card-text"><strong>Address:</strong> {{ request.address }}, {{ request.address2 }}</p>
                <p class="card-text"><strong>Email:</strong> {{ request.email }}</p>
                <button @click="changeview(request.id)" class="btn btn-primary">Viewed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-pagination v-model="currentPageActive" :total-rows="totalRequestActive" :per-page="perPage" class="mt-3 rounded-pill" align="center"></b-pagination>

      <div class="container mt-4">
      <h2>View Archieve Requests</h2>
      <div class="row">
        <div v-for="request in displayedRequestOld" :key="request.id" class="col-md-6">
          <div class="card request-card">
            <div class="card-body">
              <h5 class="card-title">Request Details</h5>
              <p class="card-text"><strong>Date:</strong> {{ request.date }}</p>
              <p class="card-text"><strong>Type:</strong> {{ request.type }} | <strong>Company:</strong> {{ request.company }}</p>
              <p class="card-text"><strong>Message:</strong> {{ request.message }}</p>
              <p class="card-text"><strong>Mobile:</strong> {{ request.mobile }} | <strong>Username:</strong> {{ request.username }}</p>
              <p class="card-text"><strong>Address:</strong> {{ request.address }}, {{ request.address2 }}</p>
              <p class="card-text"><strong>Email:</strong> {{ request.email }}</p>
              <button @click="undoview(request.id)" class="btn btn-primary">Undo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-pagination v-model="currentPageOld" :total-rows="totalRequestOld" :per-page="perPage" class="mt-3 rounded-pill" align="center"></b-pagination>

  </div>
    `,
    components:{'admin_header_componenet':admin_header,
},
data(){
    return{
        requests:"",
        perPage:2,
        currentPageActive:1,
        activeRequests:"",
        oldRequests:"",
        currentPageOld:1
    }

},
mounted(){
    fetch("/requests").then(response=>{return response.json()}).
    then((data)=>{
        this.requests=data['requests']
        this.activeRequests=this.requests.filter(a=>a.viewed==="no")
        this.oldRequests=this.requests.filter(a=>a.viewed==='yes')
    }).catch(error=>console.log(error))
},
computed: {
    totalRequestActive(){
        return this.activeRequests.length
    },
    displayedRequestActive() {
        const startIndex = (this.currentPageActive - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        return this.activeRequests.slice(startIndex, endIndex);
      },
      totalRequestOld(){
        return this.oldRequests.length
    },
    displayedRequestOld() {
        const startIndex = (this.currentPageOld - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        return this.oldRequests.slice(startIndex, endIndex);
      },
},
methods:{
    changeview(a){
        console.log("changeiew",a)
        fetch(`/requests/${a}`).then(response=>{return response.json()}).
        then((data)=>{
            if(data=="data successfully edited")
            window.location.reload()
        }).catch(error=>console.log(error))

    },
    undoview(a){
        console.log("changeiew",a)
        fetch(`/undoview/${a}`).then(response=>{return response.json()}).
        then((data)=>{
            if(data=="data successfully edited")
            window.location.reload()
        }).catch(error=>console.log(error))

    }

}
}  );

  export default admin_request
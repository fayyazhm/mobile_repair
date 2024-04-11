console.log("admin header")

const admin_header = Vue.component("admin_header", {
    template: `
    <header>
            <h2>Admin Homepage</h2>
            <div class="profile-buttons">
                <span class="mr-3">Today's Date: <strong>{{ currentDate }}</strong></span>
                <router-link :to="'/'" class="btn btn-primary">HOME</router-link>
                <a href="/admin/logout" class="btn btn-danger">Logout</a>
            </div>
    </header>
    `
,
data(){
    return{
        currentDate:""
    }
},
mounted(){
        const today = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        this.currentDate = today.toLocaleDateString('en-US', options);
}
});

export default admin_header;

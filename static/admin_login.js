import header from "./header.js";

const admin_login = Vue.component("admin_login", {
    template: `
    <div>
    <header_component/>
    <body class="bg-light d-flex align-items-center justify-content-center" style="height: 80vh;">
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card" style="height:400px">
                    <div class="card-body">
                        <h3 class="card-title text-center">Admin Login</h3>
                        <form action="#" method="post">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" id="username" v-model="user_name" name="username" placeholder="Enter your username">
                            </div>
                            <div class="form-group">
                                   <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password" name="password" placeholder="Enter your password">
                            </div>
                            <br>
                            <button type="submit" @click="submitCredentials" class="btn btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</div>
    `,
    components:{'header_componenet':header},
    data(){
        return {user_name:"",
        password:""}
    },
    methods:{
        submitCredentials(){
            event.preventDefault();
            const data={user_name:this.user_name,password:this.password};
            console.log(data+"data")
            fetch("/admin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).
            then(response=>{return response.json()}).
            then(
            data=>{
                if(data==="successfully logged"){
                console.log(data)
                window.location.href="/admin/home/page";}
                else{
                    alert("wrong credentials try again")
                }
            }
          ).catch(error=>console.log("error:",error))
          }
    },

    }
  );

  export default admin_login
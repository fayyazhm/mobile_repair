console.log("helo");
import homepage from "./homepage.js";
import admin_login from "./admin_login.js"
import contact from "./contact.js";
import pricing_page from "./pricing_page.js";
import testimonials from "./testimonials.js";
import product_details from "./product_details.js";

const routes = [
    {path: "/", component: homepage },
    {path:"/admin",component:admin_login},
    {path:"/contact",component:contact},
    {path:"/home",component:homepage},
    {path:"/pricing/:c",component:pricing_page,props:true},
    {path:"/testimonials",component:testimonials},
    {path:"/productdetails/:c",component:product_details,props:true}

  ];

  const router = new VueRouter({ routes });

  const a = new Vue({
    el: "#app",
    router,
  });

console.log("admin homepage");

import admin_homepage from "./admin_homepage.js";
import admin_request from "./admin_request.js";
import admin_product from "./admin_product.js";
import admin_billing from "./admin_billing.js";

const routes = [
  {path: "/", component: admin_homepage },
  {path:"/request",component:admin_request},
  {path:"/product",component:admin_product},
  {path:"/billing",component:admin_billing}
  ];
  


  const router = new VueRouter({ routes });
  
  const ab = new Vue({
    el: "#dap",
    router,
  });
  
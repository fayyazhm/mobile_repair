const header = Vue.component("header_component", {
    template: `
    <header>
        <div class="container">
            <h1>Mobile Repair Shop</h1>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link :to="'/home'" class="nav-link">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/pricing/all'" class="nav-link">Pricing</router-link>
                            </li>
                        <li class="nav-item">
                            <router-link :to="'/testimonials'" class="nav-link">Testimonials</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/contact'" class="nav-link">Contact</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/admin'" class="nav-link">Admin Login</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    `
});

export default header;

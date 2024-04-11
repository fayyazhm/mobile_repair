import header from "./header.js";

const testimonials = Vue.component("testimonials", {
    template: `
    <div>
    <header_component/>
    <div class="container" style="margin-top:10px">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="testimonial">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">John Doe</h5>
                            <h6 class="card-subtitle mb-2">CEO, Company Name</h6>
                            <p class="card-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Jane Smith</h5>
                            <h6 class="card-subtitle mb-2">Marketing Manager, Another Company</h6>
                            <p class="card-text">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."</p>
                        </div>
                    </div>
                </div>
                <!-- Add more testimonials as needed -->
            </div>
        </div>
    </div>
    </div>
    `,
    components:{'header_componenet':header}
    }
  );

  export default testimonials
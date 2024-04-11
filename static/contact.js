import header from "./header.js";
console.log("Contact us")

const contact = Vue.component("contact", {
  template: `
  <div>
    <header_componenet/>
    <div class="bg-light d-flex align-items-center justify-content-center" style="height: 80vh;">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="contact-info text-center">
            <h2>Contact Us</h2>
            <p><strong>Mobile Repair Shop Name:</strong> XYZ Mobile Repair</p>
            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p><strong>Email:</strong> info@example.com</p>
            <p><strong>Address:</strong> 123 Main Street, City, Country</p>
            <p><strong>Opening Hours:</strong> Monday - Saturday: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  `,
  components: {
    'header_componenet': header
  }

});

export default contact;

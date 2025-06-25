export default function Contact() {
  return `
  
  
    <section id="contact" class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Heading -->
        <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Find Us</h2>
    
        <!-- Map + Info Container -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Google Map -->
          <div class="rounded-lg overflow-hidden shadow-lg">
            <iframe
              class="w-full h-96 border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.896159614735!2d30.83112301508591!3d28.115123982625896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145b7e6b8f3c4d3f%3A0x8f0b8f8b6e6b7d9a!2sTaha%20Hussein%20St%2C%20Minya%2C%20Minya%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1697056789012!5m2!1sen!2seg"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
    
          <!-- Contact Info -->
          <div class="space-y-4 text-gray-700 dark:text-gray-300">
            <p class="flex items-start gap-2">
              <i class="ri-map-pin-line text-xl text-indigo-500"></i>
              <span><strong>Address:</strong> Taha-Hussein St, Minya, Egypt</span>
            </p>
            <p class="flex items-start gap-2">
              <i class="ri-phone-line text-xl text-indigo-500"></i>
              <span><strong>Phone:</strong> +20 1224170048</span>
            </p>
            <p class="flex items-start gap-2">
              <i class="ri-mail-line text-xl text-indigo-500"></i>
              <span><strong>Email:</strong> easyrent15@gmail.com</span>
            </p>
            <p class="flex items-start gap-2">
              <i class="ri-time-line text-xl text-indigo-500"></i>
              <span><strong>Office Hours:</strong> Mon–Fri, 9 AM – 5 PM</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  
  `;
}

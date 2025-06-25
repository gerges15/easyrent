export default function Footer() {
  return `
  
      <footer class="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <!-- Logo & Description -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-white to-indigo-100 rotate-45 rounded-md relative">
              <div class="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-700 rotate-45 rounded-sm"></div>
            </div>
            <h2 class="text-xl font-extrabold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent leading-tight">
              EASY<br />RENT
            </h2>
          </div>
          <p class="text-sm leading-relaxed">
            Easy Rent is dedicated to simplifying the process of finding student accommodations.
            We connect students and property owners to make housing seamless and efficient.
          </p>
          <div class="flex gap-3 mt-4">
            <a href="#" class="hover:text-indigo-500 text-lg"><i class="ri-facebook-fill"></i></a>
            <a href="#" class="hover:text-pink-500 text-lg"><i class="ri-instagram-fill"></i></a>
            <a href="#" class="hover:text-blue-500 text-lg"><i class="ri-linkedin-fill"></i></a>
            <a href="#" class="hover:text-sky-500 text-lg"><i class="ri-twitter-fill"></i></a>
          </div>
        </div>
    
        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-indigo-500">
                <i class="ri-arrow-right-s-line"></i> Online Booking
              </a>
            </li>
            <li>
              <a href="privacypolicy.html" class="flex items-center gap-2 hover:text-indigo-500">
                <i class="ri-arrow-right-s-line"></i> Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-indigo-500">
                <i class="ri-arrow-right-s-line"></i> Special Offers
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-indigo-500">
                <i class="ri-arrow-right-s-line"></i> Room Customization
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center gap-2 hover:text-indigo-500">
                <i class="ri-arrow-right-s-line"></i> Customer Support
              </a>
            </li>
          </ul>
        </div>
    
        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <i class="ri-phone-fill text-indigo-500 text-xl"></i>
              <div>
                <h5 class="font-semibold">Phone Number</h5>
                <p>+20 1224170048</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <i class="ri-mail-fill text-indigo-500 text-xl"></i>
              <div>
                <h5 class="font-semibold">Email Address</h5>
                <p>info@easyrent15.com</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <i class="ri-map-pin-fill text-indigo-500 text-xl"></i>
              <div>
                <h5 class="font-semibold">Office Location</h5>
                <p>Minya st. Taha-Hessien</p>
              </div>
            </li>
          </ul>
        </div>
    
      </div>
    
      <!-- Bottom Bar -->
      <div class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 EasyRent. All rights reserved.
      </div>
    </footer>
  `;
}

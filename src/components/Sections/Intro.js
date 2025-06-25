export default function Intro()
{
  return `
    
         
      <section class="bg-gray-100 dark:bg-gray-900 py-16">
        <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          
          <!-- Content -->
          <div class="w-full md:w-1/2 space-y-5 text-center md:text-left">
            <p class="text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-300">Intro Video</p>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Meet With Our Rooms</h2>
            <p class="text-gray-600 dark:text-gray-300">
              Explore your temporary home with our virtual tours! No need to visit in person—
              tour rooms from your device and find your perfect space today.
            </p>
            <button
              onclick="window.location.href='./student/payment.html'"
              class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition"
            >
              Book Now
            </button>
          </div>
      
          <!-- Video -->
          <div class="w-full md:w-1/2">
            <div class="overflow-hidden rounded-xl shadow-lg">
              <video
                autoplay
                muted
                loop
                playsinline
                class="w-full h-auto min-h-[300px] object-cover"
              >
                <source src="./images/rooms.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
    
    `;
}
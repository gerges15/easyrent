export default function Login() {
  return `
  <main class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl space-y-6">
      <!-- Success Message -->
      <div id="successMessage" class="hidden text-green-600 flex items-center text-sm bg-green-50 dark:bg-green-900 dark:text-green-200 p-3 rounded-lg">
        <i class="fas fa-check-circle mr-2"></i>
        Successfully logged in! Welcome to EasyRent.
      </div>

      <!-- Header -->
      <div class="text-center">
        <img src="/icon.png" alt="Logo" class="w-12 h-12 mx-auto rounded-full" />
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mt-4">Welcome Back</h1>
      </div>

      <!-- Login Form -->
      <form id="loginForm" class="space-y-4">
        <!-- Role Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Login As</label>
          <div class="grid grid-cols-3 gap-2">
            <label class="flex flex-col items-center p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer hover:border-indigo-500 transition">
              <input type="radio" name="userType" value="student" class="hidden" required />
              <i class="ri-graduation-cap-line text-2xl mb-1"></i>
              <span class="text-sm">Student</span>
            </label>
            <label class="flex flex-col items-center p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer hover:border-indigo-500 transition">
              <input type="radio" name="userType" value="admin" class="hidden" />
              <i class="ri-shield-user-line text-2xl mb-1"></i>
              <span class="text-sm">Admin</span>
            </label>
            <label class="flex flex-col items-center p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white cursor-pointer hover:border-indigo-500 transition">
              <input type="radio" name="userType" value="owner" class="hidden" />
              <i class="ri-home-gear-line text-2xl mb-1"></i>
              <span class="text-sm">Owner</span>
            </label>
          </div>
        </div>

        <!-- Phone or Email -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone number or email</label>
          <input type="text" id="phone" placeholder="Enter your phone number or email" required
            class="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <div class="relative mt-1">
            <input type="password" id="password" placeholder="Enter your password" required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="button" id="togglePasswordBtn"
              class="absolute inset-y-0 right-3 flex items-center text-sm text-indigo-600 hover:underline">Show</button>
          </div>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center">
          <input type="checkbox" id="rememberMe" class="mr-2" />
          <label for="rememberMe" class="text-sm text-gray-600 dark:text-gray-300">Remember me</label>
        </div>

        <!-- Submit -->
        <button type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
          Sign In
        </button>

        <!-- Forgot -->
        <div class="text-right text-sm">
          <a href="forgetpass.html" class="text-indigo-600 hover:underline">Forgot password?</a>
        </div>

        <!-- Separator -->
        <div class="flex items-center gap-4 my-4">
          <div class="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span class="text-gray-500 text-sm">or continue with</span>
          <div class="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <!-- Social Buttons -->
        <div class="space-y-3">
          <button type="button" onclick="window.location.href='logingoogle.html'"
            class="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md">
            <i class="fab fa-google"></i> Continue with Google
          </button>
          <button type="button" onclick="window.location.href='loginApple.html'"
            class="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-2 rounded-md">
            <i class="fab fa-apple"></i> Continue with Apple
          </button>
          <button type="button" onclick="window.location.href='face.html'"
            class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
            <i class="fab fa-facebook-f"></i> Continue with Facebook
          </button>
        </div>
      </form>
    </div>
  </main>
 

  `;
}

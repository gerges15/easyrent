<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBfbTXLfkcHCPOcqL4ydfyjToZB-u78wF8",
    authDomain: "easyrent-c855f.firebaseapp.com",
    projectId: "easyrent-c855f",
    storageBucket: "easyrent-c855f.firebasestorage.app",
    messagingSenderId: "721562923241",
    appId: "1:721562923241:web:eb42356bee20b2ba134078",
    measurementId: "G-RGMHSSPZSJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

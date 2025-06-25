import About from "./components/Sections/About.js";
import Properties from "./components/Sections/Properties.js";
import Units from "./components/Sections/Units.js";
import Home from "./Home.js";
import Admin from "./pages/admin.js";
import Login from "./pages/login.js";
import SignUp from "./pages/signUp.js";

// Key = URL path, Value = Component function
const routes = {
  "/": Home,
  "/login": Login,
  "/signUp": SignUp,
  "#units": Units,
  "#about-us": About,
  "#properties": Properties,
  "/admin": Admin,
};

export default routes;

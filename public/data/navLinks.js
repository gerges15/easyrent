import {
  homeIcon,
  infoIcon,
  unitsIcon,
  loginIcon,
  signupIcon,
  contactIcon,
  addPropertyIcon,
  logoutIcon,
} from "./../../src/utils/icons.js";

export const navLinks = [
  { label: "Home", path: "/", icon: homeIcon },
  { label: "About Us", path: "/about-us", icon: infoIcon },
  { label: "Units", path: "/units", icon: unitsIcon },
  {
    label: "Login",
    path: "/login",
    icon: loginIcon,
    attrs: `data-action="login"`,
  },
  {
    label: "Sign Up",
    path: "/signUp",
    icon: signupIcon,
    attrs: `data-action="signup"`,
  },
  { label: "Contact Us", path: "#contact", icon: contactIcon, authOnly: true },
  {
    label: "Add Property",
    path: "./owner/choses.html",
    icon: addPropertyIcon,
    authOnly: true,
  },
  {
    label: "Logout",
    path: "#",
    icon: logoutIcon,
    authOnly: true,
    isLogout: true,
  },
];

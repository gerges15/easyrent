import "./output.css";
import Header from "./components/Header.js";
import Home from "./Home.js";
import { createThemeToggle } from "./components/themeToggle.js";

const app = document.querySelector("#app");
app.innerHTML = `
${Header()}
<main class="p-4">${Home()}</main>
`;

const mountPoint = document.querySelector("#theme-toggle");
mountPoint.appendChild(createThemeToggle());

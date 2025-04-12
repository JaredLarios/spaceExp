import { loadHeaderFooter } from "./utils.mjs";

const button = document.querySelector("#daily-photo");

loadHeaderFooter();

button.addEventListener("click", () => location.replace("/daily/"));

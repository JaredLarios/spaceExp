import { setupCounter } from "./counter.js";
import { loadHeaderFooter } from "./utils.mjs";

document.querySelector("#app").innerHTML = `
  <div>
    <div class="card">
      <button id="counter-button" type="button">Count numbers</button>
      <p class="counter"></p>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;


const counterButton = document.querySelector("#counter-button");
const counterText = document.querySelector(".counter");


setupCounter(counterButton, counterText);

loadHeaderFooter();


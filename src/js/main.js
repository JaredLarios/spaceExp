import { setupCounter } from "./counter.js";
import { loadHeaderFooter } from "./utils.mjs";

document.querySelector("#app").innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));

loadHeaderFooter();

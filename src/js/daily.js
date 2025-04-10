import ExternalServices from "./ExternalServices";
import ImagesListning from "./ImageListning.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices();

const galertyElement = document.querySelector(".planet__gallery");
const dateElement = document.querySelector(".daily__date");

dateElement.textContent = new Date().toDateString();

const imageListing = new ImagesListning(null, dataSource, galertyElement);

imageListing.renderSingle();
loadHeaderFooter();

import { getParam, loadHeaderFooter } from "./utils.mjs";
import ImagesListning from "./ImageListning.mjs";
import ExternalServices from "./ExternalServices";


const dataSource = new ExternalServices();

const planet = getParam("name");

const galery = document.querySelector(".planet__galery");
const imageList = new ImagesListning(planet, dataSource, galery)

imageList.init();
loadHeaderFooter();
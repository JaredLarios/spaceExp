import { getParam, loadHeaderFooter } from "./utils.mjs";
import ImagesListning from "./ImageListning.mjs";
import ExternalServices from "./ExternalServices";
import WeatherCards from "./WeatherCards.mjs";

const dataSource = new ExternalServices();

const planet = getParam("name");

const galery = document.querySelector(".planet__galery");
const tempElement = document.querySelector(".temperature");
const imageList = new ImagesListning(planet, dataSource, galery);
const weatherCard = new WeatherCards(planet, dataSource, tempElement);

weatherCard.init();
imageList.init();
loadHeaderFooter();

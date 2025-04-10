import { getParam, loadHeaderFooter } from "./utils.mjs";
import ImagesListning from "./ImageListning.mjs";
import ExternalServices from "./ExternalServices";
import WeatherCards from "./WeatherCards.mjs";

const dataSource = new ExternalServices();

const planet = getParam("name");

const gallery = document.querySelector(".planet__gallery");
const tempElement = document.querySelector(".temperature");
const sesonElement = document.querySelector("#season");
const imageList = new ImagesListning(planet, dataSource, gallery);
const weatherCard = new WeatherCards(
  planet,
  dataSource,
  tempElement,
  sesonElement,
);

weatherCard.init();
imageList.init();
loadHeaderFooter();

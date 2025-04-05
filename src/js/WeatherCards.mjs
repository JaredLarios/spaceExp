import { renderListWithTemplate } from "./utils.mjs";

function weatherTemplate(element) {
    return `
        <div>
            <p>Temperature: <span class="temperature__avg">${element.temp}</span>°F</p>
            <p>Min Temperature: <span class="temperature__min">${element.min}</span>°F</p>
            <p>Max Temperature: <span class="temperature__max">${element.max}</span>°F</p>
        </div>
    `
}

function seasonTempalte(element) {
    return `
        <div class="season">
            <p>North Season: <span class="season__north">${element.season}</span></p>
            <p>South Season: <span class="season__south">${element.south_season}</span></p>
            <p>Season: <span class="season__normal">${element.north_season}</span></p>
        </div>
    `
}

export default class WeatherCards {
    constructor(planet ,dataSoruce, parentElement, secondElement = null) {
      this.planet = planet;
      this.dataSoruce = dataSoruce;
      this.parentElement = parentElement;
      this.secondElement = secondElement;
    }
    async init() {
        const data = await this.dataSoruce.getWeather(this.planet);

        this.renderWeatherData(data);
        data.season && this.renderSeasonData(data);
    }
    renderWeatherData(data) {
        renderListWithTemplate(weatherTemplate, this.parentElement, [data]);
    }
    renderSeasonData(data) {
        renderListWithTemplate(seasonTempalte, this.secondElement, [data.season]);
    }
}
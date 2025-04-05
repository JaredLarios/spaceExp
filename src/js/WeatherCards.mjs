import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function weatherTemplate(element) {
    return `
        <div>
            <p>Temperature: <span class="temperature__avg">${element.temp}</span>°F</p>
            <p>Min Temperature: <span class="temperature__min">${element.min}</span>°F</p>
            <p>Max Temperature: <span class="temperature__max">${element.max}</span>°F</p>
        </div>
    `
}

export default class WeatherCards {
    constructor(planet ,dataSoruce, parentElement) {
      this.planet = planet;
      this.dataSoruce = dataSoruce;
      this.parentElement = parentElement;
    }
    async init() {
        const data = await this.dataSoruce.getWeather(this.planet);

        this.renderData(data);
    }
    renderData(data) {
        renderListWithTemplate(weatherTemplate, this.parentElement, [data])
    }
}
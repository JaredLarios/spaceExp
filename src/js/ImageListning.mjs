import { renderListWithTemplate } from "./utils.mjs";

function imageCardTemaplate(element) {
    return `
        <div id="${element.id}-card" class="planet__card">
            <img src="${element.img_src}" alt="rover" class="rover__image" />
            <span class="rover__camara">${element.earth_date} - ${element.camera.name}</span>
        </div>
    `
}

export default class ImagesListning {
    constructor(
            planet,
            dataSource,
            parentElement,
            template = imageCardTemaplate) {
        this.planet = planet;
        this.dataSource = dataSource;
        this.parentElement = parentElement;
        this.template = template;
    }
    async init() {
        const myList = await this.dataSource.getRoverMarsPhotos();

        const nameElements = document.querySelectorAll(".planet-name");
        nameElements.forEach((element) => element.textContent = this.planet);
        
        this.renderList(myList);
    }
    renderList(list) {
        renderListWithTemplate(this.template, this.parentElement, list);
    }
}
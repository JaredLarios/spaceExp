import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

function imageCardTemaplate(element) {
    const saved = checkIfSaved(element.id);

    return `
        <div id="${element.id}" class="planet__card">
            <div class="planet__save">
            ${saved ? 
                `<span class="saved-badge">Saved</span>` :
                `<button class="button save-btn" data-id="${element.id}">Save</button>`}
            </div>
            <img src="${element.img_src}" alt="rover" class="rover__image" />
            <span class="rover__camara">${element.earth_date} - ${element.camera.name}</span>

        </div>
    `
}

function checkIfSaved(id) {
    const saved = localStorage.getItem("so-favs");
    return saved ? JSON.parse(saved).some(item => item.id === id) : false;
}

export default class ImagesListning {
    constructor(
            planet = "earth",
            dataSource,
            parentElement,
            template = imageCardTemaplate) {
        this.planet = planet;
        this.dataSource = dataSource;
        this.parentElement = parentElement;
        this.template = template;
    }

    async init() {
        const myList = await this.dataSource.getPlanetPhotos(this.planet);

        const nameElements = document.querySelectorAll(".planet-name");
        nameElements.forEach((element) => element.textContent = this.planet);
        
        this.renderList(myList);
    }

    renderList(list) {
        renderListWithTemplate(this.template, this.parentElement, list);
        this.addSaveListeners(list);
    }

    async renderSingle() {
        const data = await this.dataSource.getDailyPhoto();
        renderListWithTemplate(this.template, this.parentElement, [data]);
        this.addSaveListeners([data]);
    }

    addSaveListeners(list) {
        const listButtons = this.parentElement.querySelectorAll(".save-btn");

        listButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                this.saveImageCard(id, list);
            })
        });
    }

    saveImageCard(id, list) {
        const item = list.find(element => element.id === Number(id));
        const favsSaved = getLocalStorage("so-favs") || [];
        favsSaved.push(item);
        setLocalStorage("so-favs", favsSaved);
        location.reload();
    }
}
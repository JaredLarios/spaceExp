import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cardTemaplate(element) {
  return `
        <div id="${element.id}" class="planet__card">
            <img src="${element.img_src}" alt="rover" class="rover__image" />
            <span class="rover__camara">${element.earth_date} - ${element.camera.name}</span>
        </div>
    `;
}

export default class SavedGallery {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  async init() {
    const itemsList = getLocalStorage("so-favs") || [];

    this.renderCards(itemsList);
  }

  renderCards(list) {
    renderListWithTemplate(cardTemaplate, this.parentElement, list);
  }
}

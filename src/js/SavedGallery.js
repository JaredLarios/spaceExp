import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

function cardTemaplate(element) {
  return `
        <div id="${element.id}" class="planet__card">
          <div>
            <button class="button del-btn" data-id="${element.id}">Delete</button>
          </div>
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
    this.addDeleteListeners();
  }

  addDeleteListeners() {
    const listButtons = this.parentElement.querySelectorAll(".del-btn");

    listButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            this.deleteItem(id);
        })
    });
  }

  deleteItem(id) {
    const favsSaved = getLocalStorage("so-favs") || [];
    const updatedList = favsSaved.filter(element => element.id !== Number(id));

      setLocalStorage("so-favs", updatedList);
      location.reload();
  }
}

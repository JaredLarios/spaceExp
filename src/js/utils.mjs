export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const query = urlParams.get(param);

  return query;
}

export function renderWithTemplate(template, parent, data, callback) {
    parent.insertAdjacentHTML("afterbegin", template);
    callback && callback(data);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const tempalte = await response.text();
  return tempalte;
}

function updateFavNumber() {
  const counter = document.querySelector("#favCount");
  const number = getLocalStorage("count");
  counter.textContent = number;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  updateFavNumber();
}

// Render a list of templates
export function renderListWithTemplate(
  templateFunction,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const listElements = list.map(templateFunction);

  // if clear is true clear DOM
  clear && (parentElement.innerHtml = "");

  parentElement.insertAdjacentHTML(position, listElements.join(""));
}

export function firstKey(data) {
  return Object.keys(data)[0];
}


export function getLastWeekDate() {
  const currentDate = new Date();
  const year = String(currentDate.getFullYear()).padStart(2, "0");
  currentDate.setDate(currentDate.getDate() - 7);
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return { year, month, day }
}
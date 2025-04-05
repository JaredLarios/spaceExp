export function renderWithTemplate(template, parent, data, callback) {
    parent.insertAdjacentHTML("afterbegin", template);
    callback && callback(data);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const tempalte = await response.text();
  return tempalte;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
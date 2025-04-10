import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export function setupCounter(element, childElement) {
  let counter = getLocalStorage("count") || 0;
  const setCounter = (count) => {
    setLocalStorage("count", count);
    counter = count;
    childElement.innerHTML = `count is ${counter}`;
    location.reload();
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  //setCounter(0);
}

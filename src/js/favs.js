import SavedGallery from "./SavedGallery";

const galleryElement = document.querySelector(".favs__gallery");

const savedGallery = new SavedGallery(galleryElement);

savedGallery.init();
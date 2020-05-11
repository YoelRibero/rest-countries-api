import { API } from './Api.js';
import { Interfaz } from './Interfaz.js';

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".filter-region-options-container");

const optionsList = document.querySelectorAll(".filter-region-option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});


export const api = new API('https://restcountries.eu/rest/v2/all');
export const interfaz = new Interfaz();

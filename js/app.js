import { API } from './Api.js';
import { Interfaz } from './Interfaz.js';

export const api = new API('https://restcountries.eu/rest/v2/all');
export const interfaz = new Interfaz();


// Vars

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".filter-region-options-container");
const optionsList = document.querySelectorAll(".filter-region-option");
const $buttonClose = document.querySelector('.btn-close');
export const $modalCountries = document.querySelector('.modal-countries');
export const $overlay = document.querySelector('.overlay');
export const $modalContainer = document.querySelector('.modal-container');


// Listeners

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

// Events to hide modal
$buttonClose.addEventListener('click', interfaz.hideModal);
window.addEventListener('click', () => {
  if(event.target === $overlay) {
    interfaz.hideModal();
  }
});

// Events to show modal
setTimeout(() => {
  const titleCountries = document.querySelectorAll('.country-info-name a');
  titleCountries.forEach(country => {
    country.addEventListener('click', e => {
      e.preventDefault();
      const countryCode = e.target.dataset.country;
      const dataCountry = new API(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
      dataCountry.getData()
        .then(data => {
          interfaz.showModal(data, $modalCountries);
        })
    })
  })
}, 1000);



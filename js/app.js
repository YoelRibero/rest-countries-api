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
const $checkbox = document.querySelectorAll('.radio');
const $searchInput = document.querySelector('.filter-search input');
// const $bordersCountry = document.querySelectorAll('.country-border')

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

// Event DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Loaded Countries
  api.getData()
    .then( data => {
      interfaz.showCountries(data);
  })
  tourProducts();
});

// Event Filter Select
$checkbox.forEach(radio => {
  radio.addEventListener('change', e => {
      const dataCountriesRegion = new API(`https://restcountries.eu/rest/v2/region/${e.target.value}`);
      interfaz.removeCountries();
      dataCountriesRegion.getData()
        .then(data => {
          interfaz.showCountries(data);
        })
      tourProducts();
  })
});

// Event search input
$searchInput.addEventListener('input', () => {
  if ($searchInput.value.length >= 2) {
    console.log($searchInput.value);
    const dataCountriesSearch = new API('https://restcountries.eu/rest/v2/all');
    interfaz.removeCountries();
    dataCountriesSearch.getData()
      .then(data => {
        interfaz.getSearch($searchInput.value, data);
      })
    tourProducts();
  } else {
    interfaz.removeCountries();
    api.getData()
      .then( data => {
        interfaz.showCountries(data);
    })
    tourProducts();
  }
})


// Events to hide modal
$buttonClose.addEventListener('click', interfaz.hideModal);
window.addEventListener('click', () => {
  if(event.target === $overlay) {
    interfaz.hideModal();
  }
});

// Events to show modal
function tourProducts() {
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
        changeModalContent();
      })
    })
  }, 1000);
}

// Event inside modal
function changeModalContent() {
  setTimeout(() => {
      document.querySelector('.countries-border').addEventListener('click', (e) => {
          if(e.target.className === 'country-border') {
              console.log(e.target.textContent);
              // interfaz.hideModal();
              const countryCode = e.target.textContent;
              const dataCountry = new API(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
              dataCountry.getData()
                .then(data => {
                  interfaz.showModal(data, $modalCountries);
                })
          }
      });
  }, 1000)
}

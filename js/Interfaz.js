import { api } from './app.js';
import { API } from './Api.js';

export class Interfaz {
    constructor() {
        this.api = api;
        this.modal = document.querySelector('.modal-countries');
        this.init = this.init();
    }

    init() {
        this.dataArray();
        this.getDataCountry();
    }

    dataArray() {
        this.api.getData()
            .then( data => {
                this.tourResults(data);
            })
    }

    createTemplate(HTMLString) {
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLString
		return html.body.children[0]
	}

    templateCountry(imageUrl, countryName, countryPopulation, countryRegion, countryCapital, key) {
        return(
            `
                <div class="countries-country">
                    <div class="country-image">
                        <img src="${imageUrl}" alt="${key}">
                    </div>
                    <div class="country-info">
                        <div class="country-info-name">
                            <a href="#" data-country="${key}">${countryName}</a>
                        </div>
                        <div class="country-info-population">
                            <span>Population: </span>
                            ${countryPopulation}
                        </div>
                        <div class="country-info-region">
                            <span>Region: </span>
                            ${countryRegion}
                        </div>
                        <div class="countri-info-capital">
                            <span>Capital: </span>
                            ${countryCapital}
                        </div>
                    </div>
                </div>
            `
        )
    }

    templateModal(name, image, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders) {
        return (
            `
            <div class="country-container">
                <div class="country-image">
                    <img src="${image}" alt="">
                </div>
                <div class="country-info">
                    <div class="country-info-name">
                        <a href="#">${name}</a>
                    </div>
                    <div class="country-info-details">
                        <div class="country-info-details-general">
                            <div class="countrie-info-population">
                                <span>Native Name: </span>
                                ${nativeName}
                            </div>
                        <div class="country-info-population">
                            <span>Population: </span>
                            ${population}
                        </div>
                        <div class="country-info-region">
                            <span>Region: </span>
                            ${region}
                        </div>
                        <div class="country-info-subRegion">
                            <span>Sub Region: </span>
                            ${subregion}
                        </div>
                        <div class="country-info-capital">
                            <span>Capital: </span>
                            ${capital}
                        </div>
                    </div>
                    <div class="country-info-details-others">
                        <div class="country-info-domain">
                            <span>Top Level Domain: </span>
                            ${topLevelDomain}
                        </div>
                        <div class="country-info-carrency">
                            <span>Currencies: </span>
                            ${currencies}
                        </div>
                        <div class="country-info-languages">
                            <span>Languages: </span>
                            ${languages}
                        </div>
                    </div>
                </div>
                <div class="countries-border">
                    <div class="countries-border-title">Border Countries:</div>
                    <div class="country-border">${borders}</div>
                </div>
                </div>
            </div>
            `
        );
    }

    tourResults(data) {
        data.forEach(country => {
            const $countriesContainer = document.querySelector('.countries-container');
            const { flag, name, population, region, capital, alpha3Code} = country;
            const template = this.createTemplate(this.templateCountry(flag, name, population, region, capital, alpha3Code));
            $countriesContainer.appendChild(template);
        });
    }

    hideModal() {
        document.querySelector('.overlay').style.animation = 'fadeOut .3s forwards';
        document.querySelector('.modal-container').style.animation = 'fadeUp .2s forwards';
        setTimeout(() => {
            document.querySelector('.modal-countries').classList.remove('active');
            document.querySelector('.overlay').style.animation = '';
            document.querySelector('.modal-container').style.animation = '';
        }, 1000);
    }

    showModal(data) {
        console.log(data);
        const $modalContent = document.querySelector('.modal-content');
        const { name, flag, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = data;
        $modalContent.innerHTML = this.templateModal(name, flag, nativeName, population, region, subregion, capital, topLevelDomain, null, null, null);
        this.modal.classList.add('active');
        const buttonClose = document.querySelector('.btn-close');
        buttonClose.addEventListener('click', this.hideModal);
        window.addEventListener('click', () => {
            if(event.target === document.querySelector('.overlay')) {
                this.hideModal();
            }
        })
    }

    getDataCountry() {
        setTimeout(() => {
            const titleCountries = document.querySelectorAll('.country-info-name a');
            titleCountries.forEach(country => {
                country.addEventListener('click', e => {
                    e.preventDefault();
                    const countryCode = e.target.dataset.country;
                    // this.modal.classList.add('active');
                    const dataCountry = new API(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
                    dataCountry.getData()
                        .then(data => {
                            this.showModal(data);
                        })
                })
            })
        }, 1000)
    }
}
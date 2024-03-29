import { $modalCountries, $overlay, $modalContainer } from './app.js';

export class Interfaz {

    createTemplate(HTMLString) {
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLString
		return html.body.children[0]
	}

    templateCountry(imageUrl, countryName, countryPopulation, countryRegion, countryCapital, key) {
        return(
            `
                <div class="countries-country" data-country="${key}">
                    <div class="country-image">
                        <img src="${imageUrl}" alt="${key}">
                    </div>
                    <div class="country-info">
                        <div class="country-info-name">
                            <a href="#">${countryName}</a>
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

    removeCountries() {
        const countries = document.querySelectorAll('.countries-container .countries-country');
        countries.forEach(country => {
            country.remove();
        })
    }

    templateModal(name, image, nativeName, population, region, subregion, capital, topLevelDomain) {
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
                            
                        </div>
                        <div class="country-info-languages">
                            <span>Languages: </span>
                            
                        </div>
                        </div>
                    </div>
                    <div class="countries-border">
                        <div class="countries-border-title">Border Countries:</div>
                        <div class="countries-border-items"></div>
                    </div>
                </div>
            </div>
            `
        );
    }

    templateItems(classItem, item) {
        return(
            `
                <span class="${classItem}">${item}</span>
            `
        )
    }

    showCountries(data) {
        data.forEach(country => {
            const $countriesContainer = document.querySelector('.countries-container');
            const { flag, name, population, region, capital, alpha3Code} = country;
            const template = this.createTemplate(this.templateCountry(flag, name, population, region, capital, alpha3Code));
            $countriesContainer.append(template);
        });
    }

    getSearch(value, data) {
        const countriesFilter = data.filter(countries => {
            const countryNameLowerCase = countries.name.toLowerCase();
            const valueLowerCase = value.toLowerCase();
            return countryNameLowerCase.indexOf(valueLowerCase) !== -1;
        })
        this.showCountries(countriesFilter);
    }

    appendTemplateItem (classItem, item, container) {
        const template = this.createTemplate(this.templateItems(classItem, item));
        container.appendChild(template);
    }

    hideModal() {
        $overlay.style.animation = 'fadeOut .5s forwards';
        $modalContainer.style.animation = 'fadeUp .3s forwards';
        setTimeout(() => {
            $modalCountries.classList.remove('active');
            $overlay.style.animation = '';
            $modalContainer.style.animation = '';
        }, 1000);
    }

    showModal(data, container) {
        const $modalContent = document.querySelector('.modal-content');
        // debugger;
        const { name, flag, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = data;
        $modalContent.innerHTML = this.templateModal(name, flag, nativeName, population, region, subregion, capital, topLevelDomain);
        if(borders.length > 0) {
            borders.forEach(border => {
                setTimeout(() => {
                    this.appendTemplateItem('country-border', border, document.querySelector('.countries-border-items'));
                }, 200);
            })
        } else {
            document.querySelector('.countries-border-items').innerHTML = `<p>Country without borders</p>`;
        }
        
        currencies.forEach(currency => {
            setTimeout(() => {
                this.appendTemplateItem('country-currency', currency.name, document.querySelector('.country-info-carrency'));
            }, 200);
        })
        languages.forEach(language => {
            setTimeout(() => {
                this.appendTemplateItem('country-language', language.name, document.querySelector('.country-info-languages'));
            }, 200);
        })
        container.classList.add('active');
    }
}

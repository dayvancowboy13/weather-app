import WeatherAPI from './WeatherAPI.js';
import JSONProcessor from './JSONProcessor.js';
import jsonData from './demo-data.json';
import jsonData2 from './jul-13-data.json';

export default class DOMController {

    constructor() {

        console.log('constructing!');

    }

    static {

        console.log('DOMController initiating...');
        this.searchBtn = document.querySelector('#submit-search');
        this.searchBar = document.querySelector('#city-search');

        this.altButtons();
        // this.setupSearchBtn();

    }

    static setupSearchBtn() {

        this.searchBtn.addEventListener('click',
            () => {

                WeatherAPI.sendRequest(this.getCity()).then((json) => {

                    JSONProcessor.init(json);
                    this.renderCurrentConditions();
                    this.renderSevenDays();
                    this.renderHourly();

                }).
                    catch((err) => console.error(err));

            });

    }

    static altButtons() {

        this.searchBtn.addEventListener('click',
            () => {

                JSONProcessor.init(jsonData);
                const mainDisplay = document.querySelector('#main-display-container');
                this.renderCurrentConditions();
                this.renderSevenDays();
                this.renderHourly();
                mainDisplay.style.display = 'block';

            });


    }

    static renderCurrentConditions() {

        const currentConditions = document.querySelector('#current-conditions');
        const data = JSONProcessor.getCurrentConditions();

        currentConditions.innerHTML = `
        <div id='current-conditions-main'>
        <h2 id="city">${data.city}</h2>
        <h3 id="datetime">${data.date}<br>${data.time}</h3>
        <h1 id="temp" data-unit='c'>${this.#convertToCelsius(data.temp)}</h1>
        <div id='hi-low-temp'>High: <span data-unit='c'>${this.#convertToCelsius(data.tempMax)}</span><br>Low: <span data-unit='c'>${this.#convertToCelsius(data.tempMin)}</span></div>
        <button id='unit-switch'></button>
        <p class="conditions" data-icon=${data.icon}>${data.conditions}</p>
        <div id='expand-details-btn' class='details-hidden'></div>
        </div>
        <div id='current-conditions-details' style='display: none;'>
        <p>Feels like: <span data-unit='c'>${this.#convertToCelsius(data.feelsLike)}</span></p>
        <p>Humidity: ${data.humidity}</p>
        <p>Precipitation: ${data.precip}</p>
        <p>Pressure: ${data.pressure}</p>
        <p>Sunrise: ${data.sunrise}</p>
        <p>UV: ${data.uvindex}</p>
        </div>
        `;

        this.#initTempUnitSwitchButton(currentConditions.querySelector('#unit-switch'));
        this.#createDetailsButton();


    }

    static #createDetailsButton() {

        const btn = document.querySelector('#expand-details-btn');

        btn.addEventListener('click', () => {

            const detailsDiv = document.querySelector('#current-conditions-details');
            if (detailsDiv.style.display !== 'grid') {

                detailsDiv.style.display = 'grid';
                btn.classList.toggle('details-shown');

            } else {

                detailsDiv.style.display = 'none';
                btn.classList.toggle('details-shown');

            }


        });

    }

    static renderSevenDays() {

        const sevenDays = document.querySelector('#seven-day');
        const data = JSONProcessor.getSevenDays();

        sevenDays.innerHTML = '';

        for (let day of data) {

            sevenDays.innerHTML += `
            <div class='seven-day-card'>
            <h3>${Object.keys(day)[0]}</h3>
            <h1 id='temp' data-unit='c'>${this.#convertToCelsius(day[Object.keys(day)].temp)}</h1>
            <p class="conditions" data-icon=${day[Object.keys(day)].icon}></p>
            </div>
            `;

        }

    }

    static renderHourly() {

        const hourly = document.querySelector('#today-hourly-conditions');
        const data = JSONProcessor.getHourly();

        hourly.innerHTML = '';

        for (let hour of data) {

            hourly.innerHTML += `
            <div class='hourly-card'>
            <h3>${Object.keys(hour)[0]}</h3>
            <h1 id='temp' data-unit='c'>${this.#convertToCelsius(hour[Object.keys(hour)].temp)}</h1>
            <p class="conditions" data-icon=${hour[Object.keys(hour)].icon}></p>
            </div>
            `;

        }

    }

    static #convertToCelsius(temp) {

        return Math.round((temp - 32) / 1.8 * 10) / 10;

    }

    static #initTempUnitSwitchButton(button) {

        button.innerHTML = `
        <span class='button-unit unit-selected'>°C</span> 
        <span class='button-unit'>°F </span>`;

        button.addEventListener('click',
            () => {

                for (let child of button.children) {

                    child.classList.toggle('unit-selected');

                }

                // change any other elements with temperature to data-unt-
                this.#switchTempUnits();

            });

    }

    static #switchTempUnits() {

        let tempElements = document.querySelectorAll('[data-unit]');
        // console.log(tempElements.length);

        for (let elem of tempElements) {

            switch (elem.dataset.unit) {

                case 'c':
                    elem.dataset.unit = 'f';
                    elem.innerHTML = Math.round((elem.innerHTML * 1.8 + 32) * 10) / 10;
                    break;
                case 'f':
                    elem.dataset.unit = 'c';
                    elem.innerHTML = Math.round((elem.innerHTML - 32) / 1.8 * 10) / 10;
                    break;
                default:
                    break;

            }

        }

    }

    // build page functions:
    // render 7 day forecast tab

    static getCity() {

        return this.searchBar.value;

    }

}
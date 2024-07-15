import WeatherAPI from './WeatherAPI.js';
import JSONProcessor from './JSONProcessor.js';
import jsonData from './demo-data.json';
import jsonData2 from './jul-13-data.json';
import myIcon from './images/svg icons/conditions/clear-day.svg';

export default class DOMController {

    constructor() {

        console.log('constructing!');

    }

    static {

        console.log('DOMController initiating...');
        this.searchBtn = document.querySelector('#submit-search');
        this.searchBar = document.querySelector('#city-search');
        this.rePattern = /[ ,]*/;

        // this.altButtons();


        this.setupSearchBtn();


    }

    static setupSearchBtn() {

        this.searchBtn.addEventListener('click',
            () => {

                WeatherAPI.sendRequest(this.getCity()).then((json) => {

                    JSONProcessor.init(json);
                    this.renderCurrentConditions();
                    this.renderSevenDays();

                }).
                    catch((err) => console.error(err));

            });

    }

    static altButtons() {

        this.searchBtn.addEventListener('click',
            () => {

                JSONProcessor.init(jsonData2);
                this.renderCurrentConditions();
                this.renderSevenDays();

            });


    }

    static renderCurrentConditions() {

        const currentConditions = document.querySelector('#current-conditions');
        const data = JSONProcessor.getCurrentConditions();

        currentConditions.innerHTML = `
        <h2 id="city">${data.city}</h2>
        <h3 id="datetime">${data.date}<br>${data.time}</h3>
        <h1 id="temp" data-unit='c'>${Math.round((data.temp - 32) / 1.8 * 10) / 10}</h1>
        <button id='unit-switch'></button>
        <p class="conditions" data-conditions=${data.conditions.replace(this.rePattern, '-')}>${data.conditions}</p>
        `;

        this.#initTempUnitSwitchButton(currentConditions.querySelector('button'));


    }

    static renderSevenDays() {

        const sevenDays = document.querySelector('#seven-day');
        const data = JSONProcessor.getSevenDays();

        for (let day of data) {

            console.log(day[Object.keys(day)].conditions);

            sevenDays.innerHTML += `
            <div class='seven-day-card'>
            <h3>${Object.keys(day)[0]}</h3>
            <h1 id='temp' data-unit='c'>${Math.round((day[Object.keys(day)].temp - 32) / 1.8 * 10) / 10}</h1>
            <p class="conditions" data-conditions=${day[Object.keys(day)].conditions.replace(this.rePattern, '-')}></p>
            </div>
            `;

        }

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
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

                    console.log(json);
                    return JSONProcessor.reduceJSON(json);

                }).
                    then((r) => console.log(r)).
                    catch((err) => console.error(err));

            });

    }

    static altButtons() {

        this.searchBtn.addEventListener('click',
            () => {

                console.log('processing JSON');
                // JSONProcessor.reduceJSON(jsonData2);
                JSONProcessor.init(jsonData2);
                this.renderCurrentConditions();

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
        <p>${data.conditions}</p>
        `;

        this.initTempUnitSwitchButton(currentConditions.querySelector('button'));


    }

    static initTempUnitSwitchButton(button) {

        button.innerHTML = `
        <span class='button-unit unit-selected'>°C</span> <span class='button-unit'>°F </span>
        `;

        button.addEventListener('click',
            () => {

                for (let child of button.children) {

                    child.classList.toggle('unit-selected');

                }

                // change any other elements with temperature to data-unt-

            });

    }

    // build page functions:
    // render current condtions tab
    // render 7 day forecast tab

    static getCity() {

        return this.searchBar.value;

    }

}
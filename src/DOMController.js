import WeatherAPI from './WeatherAPI.js';
import JSONProcessor from './JSONProcessor.js';
import jsonData from './demo-data.json';
import jsonData2 from './jul-13-data.json';

export default class DOMController {

    static {

        console.log('DOMController initiating...');
        this.searchBtn = document.querySelector('#submit-search');
        this.searchBar = document.querySelector('#city-search');

        this.altButtons();


        // this.searchBtn.addEventListener('click',
        //     () => {

        //         WeatherAPI.sendRequest(this.getCity()).then((json) => {

        //             return reduceJSON(json);

        //         }).
        //             then((r) => console.log(r)).
        //             catch((err) => console.error(err));

        //     });

    }

    static altButtons() {

        this.searchBtn.addEventListener('click',
            () => {

                console.log('processing JSON');
                JSONProcessor.reduceJSON(jsonData2);

            });

    }

    static getCity() {

        return this.searchBar.value;

    }

}
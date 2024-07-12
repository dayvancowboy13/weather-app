import './style.css';
import jsonData from './demo-data.json';

const WeatherAPI = {
    'queryURL': 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
    'city': 'victoria',
    'key': 'P8RGM9Y4ZKCJG7GNNZ8C47U59',
    // 'units': '?unitGroup=metric',

    testFunc(location) {

        if (location !== undefined) {

            this.city = location;

        }

        console.log(`${this.queryURL}${this.city}?key=${this.key}`);

    },

    async sendRequest(location) {

        if (location !== undefined) {

            city = location;

        }
        const response = await fetch(`${this.queryURL}${this.city}?key=${this.key}`,
            { 'mode': 'cors' });
        return response.json();

    }
};

WeatherAPI.testFunc('hongkong');
const jsonCity = jsonData.resolvedAddress;
const jsonCurrentConditions = jsonData.currentConditions;
const daysConditions = jsonData.days;

class JSONParser {

    static {

        console.log('wow! I\'m born!');

    }

}

// ℃=(℉-32)/1.8
// ℉=(℃*1.8)+32

console.log(jsonData);

// DOM functions:
//  setCelciusOrFaren()


// sendRequest().then((r) => console.log(r)).
//     catch((err) => console.error(err));
import './style.css';
import DOMController from './DOMController';
import jsonData from './demo-data.json';
import jsonData2 from './jul-13-data.json';
import * as DateFns from 'date-fns';

function celsiusToFarenheit(tempCels) {

    // ℉=(℃*1.8)+32
    return tempCels * 1.8 + 32;

}

function farenheitToCelsius(tempFaren) {

    // ℃=(℉-32)/1.8
    return (tempFaren - 32) / 1.8;


}


// const weatherDat = reduceJSON(jsonData);
// console.log(weatherDat);

// const weatherDat2 = reduceJSON(jsonData2);
// console.log(weatherDat2);

// WeatherAPI.sendRequest().then((json) => {

//     console.log(json);
//     reduceJSON(json);

// }).
//     then((r) => console.log(r)).
//     catch((err) => console.error(err));


// console.log(jsonData);


// DOM functions:
//  setCelciusOrFaren()
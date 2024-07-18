import { format, parse } from 'date-fns';

export default class JSONProcessor {

    weatherJSON = {};

    static init(rawJSON) {

        this.weatherJSON = {
            'city': rawJSON.resolvedAddress,
            'localDate': rawJSON.days[0].datetime,
            'currentConditions': {
                'cloudCover': rawJSON.currentConditions.cloudcover,
                'conditions': this.#formatConditions(rawJSON.currentConditions.conditions),
                'time': rawJSON.currentConditions.datetime, // time of the reading
                'feelsLike': rawJSON.currentConditions.feelslike,
                'humidity': rawJSON.currentConditions.humidity,
                'icon': rawJSON.currentConditions.icon,
                'precip': rawJSON.currentConditions.precip,
                'pressure': rawJSON.currentConditions.pressure,
                'snow': rawJSON.currentConditions.snow,
                'sunrise': rawJSON.currentConditions.sunrise,
                'temp': rawJSON.currentConditions.temp,
                'uvindex': rawJSON.currentConditions.uvindex,
                'wind': {
                    'dir': rawJSON.currentConditions.winddir,
                    'gust': rawJSON.currentConditions.windgust,
                    'speed': rawJSON.currentConditions.windspeed
                }
            },
            'today': {
                'hourlyForecasts': rawJSON.days[0].hours,
                'tempMax': rawJSON.days[0].tempmax,
                'tempMin': rawJSON.days[0].tempmin
            },
            'sevenDays': rawJSON.days.slice(1,
                8)
        };
        // console.log(this.weatherJSON);

    }

    static getSevenDays() {

        const days = [];

        for (let day of this.weatherJSON.sevenDays) {

            days.push({
                [`${format(day.datetime.replace(/-/g, '\/'), 'iiii, MMMM do')}`]: {
                    'temp': day.temp,
                    'tempMin': day.tempmin,
                    'tempMax': day.tempmax,
                    'conditions': this.#formatConditions(day.conditions),
                    'icon': day.icon
                }
            });

        }

        return days;

    }

    static getHourly() {

        const hours = [];
        // console.log(this.weatherJSON.today.hourlyForecasts);

        for (let hour of this.weatherJSON.today.hourlyForecasts) {

            hours.push({
                [`${format(parse(
                    hour.datetime, 'HH:mm:ss', new Date()
                ), 'h  b')}`]: {
                    'temp': hour.temp,
                    'conditions': hour.conditions,
                    'icon': hour.icon

                }
            });

        }

        // console.log(hours);

        return hours;

    }

    static getCurrentConditions() {

        return {
            'city': this.weatherJSON.city,
            'date': `${format(this.weatherJSON.localDate,
                'iiii, MMMM do, yyyy')}`,
            'time': format(parse(
                this.weatherJSON.currentConditions.time,
                'HH:mm:ss',
                new Date()
            ), 'p'),
            'temp': this.weatherJSON.currentConditions.temp,
            'tempMin': this.weatherJSON.today.tempMin,
            'tempMax': this.weatherJSON.today.tempMax,
            'conditions': this.weatherJSON.currentConditions.conditions,
            'icon': this.weatherJSON.currentConditions.icon,
            'feelsLike': this.weatherJSON.currentConditions.feelsLike,
            'humidity': this.weatherJSON.currentConditions.humidity,
            'precip': this.weatherJSON.currentConditions.precip,
            'pressure': this.weatherJSON.currentConditions.pressure,
            'snow': this.weatherJSON.currentConditions.snow,
            'sunrise': format(parse(
                this.weatherJSON.currentConditions.sunrise,
                'HH:mm:ss',
                new Date()
            ), 'h:mm b'),
            'uvindex': this.weatherJSON.currentConditions.uvindex,
            'wind': {
                'dir': this.weatherJSON.currentConditions.winddir,
                'gust': this.weatherJSON.currentConditions.windgust,
                'speed': this.weatherJSON.currentConditions.wind.speed
            }
        };

    }


    static #formatConditions(conditions) {

        if (conditions.includes(',')) {

            let index = conditions.indexOf(',');
            // console.log(conditions.slice(0, index));
            return conditions.slice(0, index);

        }

        return conditions.replace(' ', '-');

    }

    static printJSON() {

        console.log(this.weatherJSON);

    }

}
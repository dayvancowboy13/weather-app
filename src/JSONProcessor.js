import { format, parse } from 'date-fns';

export default class JSONProcessor {

    weatherJSON = {};

    static init(rawJSON) {

        this.weatherJSON = {
            'city': rawJSON.resolvedAddress,
            'localDate': rawJSON.days[0].datetime,
            'currentConditions': {
                'cloudCover': rawJSON.currentConditions.cloudcover,
                'conditions': rawJSON.currentConditions.conditions,
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
                    'conditions': day.conditions,
                    'icon': day.icon
                }
            });

        }

        return days;

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
            'conditions': this.weatherJSON.currentConditions.conditions
        };

    }

    static printJSON() {

        console.log(this.weatherJSON);

    }

    static reduceJSON(rawJSON) {

        // console.log(rawJSON);
        return {
            'city': rawJSON.resolvedAddress,
            'currentConditions': {
                'cloudCover': rawJSON.currentConditions.cloudcover,
                'conditions': rawJSON.currentConditions.conditions,
                'datetime': rawJSON.currentConditions.datetime, // time of the reading
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

    }

}
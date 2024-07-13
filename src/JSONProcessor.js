export default class JSONProcessor {

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
                'hours': rawJSON.days[0].hours,
                'tempMax': rawJSON.days[0].tempmax,
                'tempMin': rawJSON.days[0].tempmin
            },
            'sevenDays': rawJSON.days.slice(1,
                8)
        };

    }

}